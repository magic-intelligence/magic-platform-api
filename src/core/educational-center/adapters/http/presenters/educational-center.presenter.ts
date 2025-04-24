import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";

export class EducationalCenterPresenter {
    static toHttp(educationalCenter: EducationalCenterEntity){
        return {
            ...educationalCenter,
            name: educationalCenter.name.get()
        }
    }

    static toHttpList(educationalCenters: EducationalCenterEntity[]){
        return {
            educationalCenters: educationalCenters.map(item => this.toHttp(item))
        };
    }
}