class Validator {
  constructor(schema) {
    this.idSchema = schema.idSchema;
    this.createSchema = schema.createSchema;
    this.updateSchema = schema.updateSchema;
  }

  // Helpers
  reportErrors = (error) => error.details.map(detail => detail.message);

  validate(schema, value){
    const { error } = schema.validate(value, { abortEarly: false });
    return error
      ? { isError: true, message: this.reportErrors(error) }
      : { isErorr: false, message: null }
  }

  // Mehthods

  validateID = (id) => this.validate(this.idSchema, id)
  validateCreate = (id) => this.validate(this.createScema, obj)
  validateUpdate = (id) => this.validate(this.updateSchema, obj)

}

export default Validator