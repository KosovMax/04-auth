const Contacts = require('./../model/contacts');


const get = async (req, res, next) => {
    try{
      const authId = req.auth.id
      const contacts = await Contacts.getList(authId, req.query);
      return res.json({
        status:'success',
        code: 200,
        data:{
          ...contacts
        }
      })
    }catch(e){
      next(e);
    }
  }
  
  const getById = async (req, res, next) => {
    try{
      const authId = req.auth.id
      const contact = await Contacts.getById(req.params.id, authId);
  
      if(contact){
        return res.json({
          status:'success',
          code: 200,
          data:{
            contact
          }
        })
      }else{
        return res.status(404).json({
          status:'error',
          code: 404,
          data:'Not found'
        })
      }
     
    }catch(e){
      next(e);
    }
  }
  
const create = async (req, res, next) => {
    try{
      const authId = req.auth.id
      const contact = await Contacts.create({ ...req.body, owner:authId});
       return res.status(201).json({
        status:'success',
        code: 201,
        data:{
          contact
        }
      })
    }catch(e){
      next(e);
    }
  }
  
const remove = async (req, res, next) => {
    try{
      const authId = req.auth.id
      const contact = await Contacts.remove(req.params.id, authId);
  
      if(contact){
        return res.json({
          status:'success',
          code: 200,
          data:{
            contact
          }
        })
      }else{
        return res.status(404).json({
          status:'error',
          code: 404,
          data:'Not found'
        })
      }
     
    }catch(e){
      next(e);
    }
  }
  
const update = async (req, res, next) => {
    try{
      const authId = req.auth.id
      const contact = await Contacts.update(req.params.id, req.body, authId);
  
      if(contact){
        return res.json({
          status:'success',
          code: 200,
          data:{
            contact
          }
        })
      }else{
        return res.status(404).json({
          status:'error',
          code: 404,
          data:'Not found'
        })
      }
     
    }catch(e){
      next(e);
    }
  }
  

  module.exports = {
      get,
      getById,
      create,
      update,
      remove
  }

  