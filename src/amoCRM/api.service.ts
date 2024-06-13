import { client } from './api.token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class apiService {
  async getAllLeads(query?: string | Number){
    try {
      const allLeads = [];
      // @ts-ignore
      let pagination = await client.leads.get({with:['contacts',`${query}`]});

      while(pagination) {
        const leads = pagination.getData();

        for (const lead of leads){
          const contactId: number = lead.getEmbedded().contacts[0]?.id ?? -1;

          let contactName = "Контактов нет";
          let contactPhone = "";
          let contactEmail = "";

          if(contactId !== -1) {
            const contact = await client.contacts.getById(contactId);
            contactName = contact.name;
            contactPhone = contact.custom_fields_values[0].values[0].value;
            contactEmail = contact.custom_fields_values[1].values[0].value;
          }

          const [pipeline, responsibleUser] = await Promise.all([
            client.request.get(`/api/v4/leads/pipelines/${lead.pipeline_id}/statuses/${lead.status_id}`),
            client.request.get(`/api/v4/users/${lead.responsible_user_id}`)
          ]);

          const leadData = {
            name: lead.name,
            price: lead.price,
            pipelineName: pipeline.data['name'],
            responsibleUser: responsibleUser.data['name'],
            createdAt: new Date(lead.created_at * 1000),
            contactName: contactName,
            contactPhone: contactPhone,
            contactEmail: contactEmail
          };

          allLeads.push(leadData);
        }

        const next = await pagination.next();
        if (typeof next === 'boolean') {
          break;
        } else {
          // @ts-ignore
          pagination = next;
        }
      }

      return allLeads;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
