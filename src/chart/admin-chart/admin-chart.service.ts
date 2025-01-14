import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sabha } from '../../sabha/sabha.model';
import { User } from 'src/user/user.model';
import { Complaint } from 'src/complaint/complaint/complaint.model';
import { Op } from 'sequelize';

@Injectable()
export class AdminChartService {
    constructor(
        @InjectModel(Sabha) private sabhaModel: typeof Sabha,
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Complaint) private complaintModel: typeof Complaint,
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
}