import React from 'react';
import { Alert,StyleSheet, Text, ScrollView, TouchableHighlight } from 'react-native';
import  t  from 'tcomb-form-native';
import moment from 'moment';
import Meteor from 'react-native-meteor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let TcombForm = t.form.Form;

const Gender = t.enums({
  M: 'Male',
  F: 'Female',
});
// here we are: define your domain model
let Student = t.struct({
  first_name: t.String,              // a required string
  middle_name: t.maybe(t.String),   // an optional string
  surname: t.String,
  gender: Gender,
  date_Of_Birth: t.Date,               // a required field
  address_line_1: t.String,
  rememberMe: t.Boolean,       // a boolean

});

const options = {
  label: 'Please enter student information',


/* i18n: {
   //FirstName: 'Pehla_NAAM',
   add: 'Nuovo',               // add button
   down: 'Giù',                // move down button
   optional: ' (जरुरी नहीं)',   // suffix added to optional fields
   remove: 'Elimina',          // remove button
   up: 'Su',                    // move up button
   surname: 'परिवार का नाम'
 }  */

};

function formatDate(format, date) {
  return moment(date).format('DD/MM/YYYY');
}

const myFormatFunction = format => date => formatDate(format, date);
const myFormat1 = 'dd/mm/yyyy';


 const Form = React.createClass({

   setInitialValue(savedValue) {
     console.log('inside setInitialValue ='+JSON.stringify(savedValue));
   },

   componentDidMount(){
     console.log('inside componentDidMount');
     this.getStateFromServer();
   },

   getStateFromServer(){
     var that = this;
     Meteor.call('findStudentForUserId',function(error,data){
          if(error){
              console.log('inside error of findStudentForUserId');
           }
          else {
            //console.log('inside callback of findStudentForUserId data='+JSON.stringify(data));
            that.setState({value:data});
        }
     });
   },

     getInitialState(savedValue) {
        return {
        value :{}
        };
     },



  onChange(value) {
      this.setState({value});
  },



  onPress: function () {
    // call getValue() to get the values of the form
    let value = this.refs.form.getValue();
    let that = this;
    if (value) { // if validation fails, value will be null
      console.log(JSON.stringify(value)); // value here is an instance of Person
      Meteor.call('student-update',value,function(error,data){
          if(error){

          console.log('inside error of form');

          }
          else {

           console.log('inside callback of form  '+(JSON.stringify(value)));
           Alert.alert(
            'Form Saved ',
            'Please Go to next tab to fill parent information.Press ok to continue',
            [{text: 'OK', onPress: () => console.log('Student form submitted!')},]
          );
           that.getStateFromServer();
          }

      });
    }
  },



  _getFormOptions () {
    return {
      legend: 'Please enter autocap student information below',
      fields: {

        first_name: {
          autoCapitalize: 'characters',
          returnKeyType: 'next',
          onSubmitEditing: () => {this.refs.form.getComponent('middle_Name').refs.input.focus()},
          error:'First Name is Required',
        },

        middle_name: {
          returnKeyType: 'next',
          onSubmitEditing: () => {this.refs.form.getComponent('surname').refs.input.focus()},
        },

        surname: {
          returnKeyType: 'next',
          onSubmitEditing: () => {this.refs.form.getComponent('gender').refs.prompt},
        },

        gender: {
      //    nullOption: {value: '', label: 'Choose your gender'},
          returnKeyType: 'enter',
          onValueChange: () => {this.refs.form.getComponent('date_Of_Birth').refs.prompt},
        },

        date_Of_Birth: {

          //returnKeyType: 'enter',
          onDateChange: () => {this.refs.form.getComponent('address_line_1').refs.input.focus()},

          config: {
             format: myFormatFunction(myFormat1),
             maximumDate:'31/03/2014',
          },
        },
      },
    };
  },

  render: function() {

    var formOptions = this._getFormOptions();

    return (
        <ScrollView style={styles.container} ref={(ref) => this.myScrollView = ref}>
        {/* display */}
        <TcombForm
          ref="form"
          type={Student}
          options={formOptions}
          value={this.state.value}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </ScrollView>

    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 10,
    backgroundColor: '#87CEFA',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 5,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


module.exports = Form;
