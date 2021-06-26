import mongoose from 'mongoose';

const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
  username:{type:String, required: true, unique: true},
  password:{type:String, required: true},
  todoList:[{
    name: String,
    priority: String,
    separate: Number,
    needtime: Number,
    deadline: String,
    completed: Number
  }],
  scheduledList:[{
    name: String,
    priority: String,
    separate: Number,
    needtime: Number,
    deadline: String,
    completed: Number
  }],
  schedule:[{
    date: String,
    events: [{
      name: String,
      completed: Boolean
    }]
  }],
  day: [Number],
  completeDate:{testprop:Number}
},{collection:'users',strict: false})

// Creating a table within database with the defined schema
const User = mongoose.model('UserSchema', UserSchema)

// Exporting table for querying and mutating
export default User;
