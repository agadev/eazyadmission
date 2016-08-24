import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  // This code only runs on the server
}


Meteor.methods({

  'findStudentForUserId':function(){
    //console.log('inside server findStudentForUserId '+this.userId);
     if (! this.userId) {
        throw new Meteor.Error('not-authorized');
     }
    const dbStudent = Students.findOne({_id:this.userId});
    return dbStudent;
  },

  'student-update':function(student) {
    //console.log('inside server student-update for id= '+ this.userId);
    // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Students.update(
      { _id: this.userId},
      { $set:
      {first_name: student.first_name,
        middle_name: student.middle_name,
        surname: student.surname,  // an optional string
        gender: student.gender,
        date_Of_Birth: student.date_Of_Birth,
        address_line_1: student.address_line_1,
        update_time: new Date()}
      },
        {upsert:true}
      );
  }
});
