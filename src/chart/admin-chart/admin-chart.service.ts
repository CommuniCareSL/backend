import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sabha } from '../../sabha/sabha.model';
import { User } from 'src/user/user.model';
import { Complaint } from 'src/complaint/complaint/complaint.model';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

@Injectable()
export class AdminChartService {
    constructor(
        @InjectModel(Sabha) private sabhaModel: typeof Sabha,
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Complaint) private complaintModel: typeof Complaint,
        private sequelize: Sequelize,
    ) {}

    async getComplaintCountsByStatus(sabhaId: number) {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const complaints = await this.complaintModel.findAll({
            where: {
                sabhaId: sabhaId,
                createdAt: {
                    [Op.gte]: threeMonthsAgo,
                },
            },
            attributes: [
                'status',
                [this.complaintModel.sequelize.fn('COUNT', this.complaintModel.sequelize.col('status')), 'count'],
            ],
            group: ['status'],
        });

        const statusCounts = {
            pending: 0,
            inProgress: 0,
            resolved: 0,
            rejected: 0,
        };

        complaints.forEach(complaint => {
            switch (complaint.status) {
                case 0:
                    statusCounts.pending = complaint.get('count') as number;
                    break;
                case 1:
                    statusCounts.inProgress = complaint.get('count') as number;
                    break;
                case 2:
                    statusCounts.resolved = complaint.get('count') as number;
                    break;
                case 3:
                    statusCounts.rejected = complaint.get('count') as number;
                    break;
            }
        });

        return statusCounts;
    }

    async getComplaintDataBySabhaId(sabhaId: number) {
        const complaints = await this.complaintModel.findAll({
            where: { sabhaId },
            attributes: ['status', 'createdAt'],
        });

        // Process the data to group by month and status
        const data = this.processComplaintData(complaints);
        return data;
    }

    private processComplaintData(complaints: any[]) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const data = {
            labels: months,
            datasets: [
                { label: 'Pending', data: new Array(12).fill(0) },
                { label: 'In Progress', data: new Array(12).fill(0) },
                { label: 'Resolved', data: new Array(12).fill(0) },
                { label: 'Rejected', data: new Array(12).fill(0) },
            ],
        };

        complaints.forEach(complaint => {
            const month = new Date(complaint.createdAt).getMonth();
            const status = complaint.status;

            if (status >= 0 && status <= 3) {
                data.datasets[status].data[month]++;
            }
        });

        return data;
    }

    async getWeeklyComplaints(sabhaId: number): Promise<{ [key: string]: number }> {
        const query = `
          SELECT
            TO_CHAR("createdAt", 'Dy') AS day,
            COUNT(*) AS count
            FROM
            complaint
            WHERE
            "sabhaId" = :sabhaId
            AND "createdAt" >= (CURRENT_DATE - INTERVAL '7 days')
            GROUP BY
            day
            ORDER BY
            MIN("createdAt");
        `;
    
        // Use type assertion to define the structure of the query results
        const results = await this.sequelize.query<{ day: string; count: number }>(query, {
          replacements: { sabhaId },
          type: QueryTypes.SELECT,
        });
    
        // Use inline type definition for the reduce function
        const weeklyComplaints = results.reduce<{ [key: string]: number }>((acc, { day, count }) => {
          acc[day] = count;
          return acc;
        }, {});
    
        return weeklyComplaints;
      }
}