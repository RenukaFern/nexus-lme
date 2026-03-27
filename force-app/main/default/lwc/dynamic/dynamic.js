import { LightningElement,track,api } from 'lwc';
 
export default class MySection extends LightningElement {
   
   @track incomelist=[{id:1}];
   @track assetlist=[{id:1}];
   @track liabilitylist=[{id:1}];
 
@api recordId;
@api applicationId;
    @api get incomeliststring() { return this.wholerecord(this.incomelist); }
    @api get assetliststring() { return this.wholerecord(this.assetlist); }
    @api get liabilityliststring() { return this.wholerecord(this.liabilitylist); }
 
    wholerecord(listdata){
        return listdata.map(item=>{
            const newitem={...item};
            delete newitem.id;
            newitem.Application__c=this.applicationId;
            newitem.Account__c=this.recordId;
            return newitem;
        });
    }
 
    handleInputChange(event) {
        const id=event.target.dataset.id;
        const field=event.target.name;
        const value=event.target.value;
        const section=event.target.dataset.section;
        let targetlist;
        if(section==='Income') {
            targetlist=this.incomelist;}
        else if(section==='Asset')
         {targetlist=this.assetlist;}
        else if(section==='Liability')
        {targetlist=this.liabilitylist;}
 
        if(targetlist){
            let row=targetlist.find(data=>data.id==id);
            if(row){
                row[field]=value;
            }
        }
        if(section==='Income') this.incomelist=[...this.incomelist];
        else if(section ==='Asset') this.assetlist=[...this.assetlist];
        else if(section==='Liability') this.liabilitylist=[...this.liabilitylist];
        }
   //for add
    handleaddincome(){
        this.incomelist=[...this.incomelist,{id:Date.now()}];
    }
    handleaddasset(){
        this.assetlist=[...this.assetlist,{id:Date.now()}];
    }
    handleaddliability(){
        this.liabilitylist=[...this.liabilitylist,{id:Date.now()}];
    }
    // end of add
 
    // for delete
    handledeleteincome(event){
        const incid=event.currentTarget.dataset.id;
        this.incomelist=this.incomelist.filter(initem=> initem.id!=incid);
    }
    handledeleteasset(event){
         const incid=event.currentTarget.dataset.id;
        this.assetlist=this.assetlist .filter(initem=> initem.id!=incid);
    }
    handledeleteliability(event){
         const incid=event.currentTarget.dataset.id;
        this.liabilitylist=this.liabilitylist .filter(initem=> initem.id!=incid);
    }
    //end of delete
   
    //for picklist
    get assetpicklist(){
        return [
            {label:'Real Estate',value:'Real Estate'},
            {label:'Vehicle',value:'Vehicle'},
            {label:'Savings',value:'Savings'},
            {label:'Investments',value:'Investments'}
        ];
    }
    get liabilitypicklist(){
        return [
            {label:'Mortgage',value:'Mortgage'},
            {label:'Auto Loan',value:'Auto Loan'},
            {label:'Credit Card',value:'Credit Card'},
            {label:'Personal Loan',value:'Personal Loan'}
        ];
    }
    //end of picklist
}