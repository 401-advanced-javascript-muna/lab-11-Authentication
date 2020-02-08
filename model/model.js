
'use strict ';

class Model {

  constructor(schema){
    this.schema = schema;
  }

  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function' ? this.schema.jsonSchema() : {};
  }

  get(_id){
    if(_id){
      return this.schema.findOne({_id});
    }

    else {
      return this.schema.find({});
    }
  }

  create(record){
    // eslint-disable-next-line
      let newRecord = new this.schema(record);
    return newRecord.save();
  }

  update(_id,record){
    return this.schema.findByIdAndUpdate(_id,record,{ new:true});
  }


  delete(_id){
    return this.schema.findByIdAndDelete(_id);
  }

}
module.exports = Model;
