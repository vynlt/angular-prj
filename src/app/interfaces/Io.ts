import {Area} from './Area';
import {Status} from './Status'
import {RankingCategory} from './RankingCategory'

export interface Io {
    Id: string;
    Title: string;
    Description: string;
    ProposedSolution: string;
    AreaId: number;
    InitiatorUsername: string;
    InitiatorFullName: string,
    EquipmentTags: string,
    EstimatedCostNZD: number,
    ProductionUplift: number,
    ProductionUpliftUnitsId: number;
    ProductionUpliftNZD: number;
    PaybackTimeDays: number;
    RiskAreaId: number;
    InititalRiskLevelId: number;
    ResidualRiskLevelId: number;
    Budget: string;
    BudgetHolderApprovalUsername: string;
    BudgetHolderApprovalFullName: string;
    ProjectLeadUserName: string;
    ProjectLeadFullName: string;
    PCRNumber: string;
    ApprovalComments: string;
    CurrentStatusId: number;
    LastStatusId: number;
    CreatedDate: string;
    SubmittedDate: string;
    ReviewedDate: string;
    ApprovedDate: string;
    CanceledDate: string;
    DeletedDate: string;
    RankingDate: string;
    RankingCategoryId: number;
    RankingScore: number;
    RankLevelId: string;
    LastUpdatedDate: string;
    LastUpdatedBy: string;
    Area: Area;
    Status: Status;
    RankingCategory: RankingCategory;
    RankLevel: any;
    IOStakeHolders: any;
}