import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      slope_peak_segment: 0,
      thal: 0,
      resting_bp: 120,
      chest_pain: 0,
      no_vessels: 3,
      blood_sugar: 100,
      resting_ekg: 0,
      serum_chol: 90,
      old_peak: 0.0,
      sex: 1,
      age: 25,
      max_heart_rate: 72,
      exercise_pain: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
  }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            <p>
              This app can be used to predict your chances of suffering from a heart disease based on the data you enter:
            </p>
      </header>
      <br />
      <h3> <u>Data Entry Zone</u></h3>
      <br />
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label><b>Slope Of Peak Exercise Segment</b></Form.Label>
            <Form.Control defaultvalue={this.state.slope_peak_segment} onChange={this.handleChange} type="text" placeholder="Enter Integer Value" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Thallium Stress Test Results</b></Form.Label>
            <Form.Control defaultvalue = {this.state.thal} onChange={this.handleChange} type="text" placeholder="Enter 0-Normal, 1-FixedDefect, 2-ReversibleDefect" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Resting Blood Pressure</b></Form.Label>
            <Form.Control defaultvalue = {this.state.resting_bp} onChange={this.handleChange} type="text" placeholder="Enter Integer Value" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Chest Pain Type</b></Form.Label>
            <Form.Control defaultvalue = {this.state.chest_pain} onChange={this.handleChange} type="text" placeholder="0,1,2,3 - Based on Severity" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>No. Of Major Vessels colored by FLouroscopy (0-3)</b></Form.Label>
            <Form.Control defaultvalue = {this.state.no_vessels} onChange={this.handleChange} type="text" placeholder="Enter Integer Value" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Fasting Blood Sugar</b></Form.Label>
            <Form.Control defaultvalue = {this.state.blood_sugar} onChange={this.handleChange} type="text" placeholder="0 if < 120 mg/dl, 1 if > 120 mg/dl" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Resting EKG Results</b></Form.Label>
            <Form.Control defaultvalue = {this.state.resting_ekg} onChange={this.handleChange} type="text" placeholder="Enter - 0, 1, or 2" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Serum Cholestrol in mg/dl</b></Form.Label>
            <Form.Control defaultvalue = {this.state.serum_chol} onChange={this.handleChange} type="text" placeholder="Enter Integer Value" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Old Peak Equation ST Depressions</b></Form.Label>
            <Form.Control defaultvalue = {this.state.old_peak} onChange={this.handleChange} type="text" placeholder="Accepts Floating Value" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Sex</b></Form.Label>
            <Form.Control defaultvalue = {this.state.sex} onChange={this.handleChange} type="text" placeholder="0 - Female and 1 - Male" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Age</b></Form.Label>
            <Form.Control defaultvalue = {this.state.age} onChange={this.handleChange} type="text" placeholder="Enter Integer Value (years)" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Max Heart Rate Achieved</b></Form.Label>
            <Form.Control defaultvalue = {this.state.max_heart_rate} onChange={this.handleChange} type="text" placeholder="Enter Integer Value (beats per minutes)" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label><b>Exercise Induced Chest Pain</b></Form.Label>
            <Form.Control defaultvalue = {this.state.exercise_pain} onChange={this.handleChange} type="text" placeholder="0 - False, 1 - True" />
        </Form.Group>
        <br />
      <Button variant="primary" type="submit">
        Submit, Pay, Get Your Results
      </Button>
      </Form>
      </div>

    );
  }
}


export default App;
