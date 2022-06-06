import React, {Component} from 'react';
import logo from '../assets//img/favicon.png';
import '../App.css';
import Aside from './aside'
import { Link } from 'react-router-dom';


class Management extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      count: 1,
      riders: []
    };
  }

  addRiderToArray(item) {
    return (
        <tr>
          <td class="align-middle text-center">
            <div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">John Michael</h6>
                <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Aveiro</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success">Online</span>
            <span class="badge badge-sm bg-gradient-secondary">Offline</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">4.5</span>
          </td>
        </tr>
    )
  }

  addOrderToArray(item) {
    return (
      <tr>
        <td class="align-middle text-center">
          <div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">Address</h6>
            </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">Store 1</p>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">Client 1</span>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-success">Done</span>
          <span class="badge badge-sm bg-gradient-secondary">In Progress</span>
        </td>
        <button> Add Rider</button>
      </tr>
    )
  }
  
  render() {

    const RequestMapping = () => {

        let resp_rider = fetch('http://localhost:8080/api/riders', {  
            method: 'GET'
        }).then((data) => {
            this.setState({riders: []})
            data.json().then((list) => {
                let newArray = []
                list.forEach((item) => {
                    newArray.push(
                        this.addRiderToArray(item)
                    )
                }); 
                this.setState({ riders: newArray})
            });
        })

        let resp_order = fetch('http://localhost:8080/api/orders', {
            method: 'GET'
        }).then((data) => {
            this.setState({orders: []})
            data.json().then((list) => {
                let newArray = []
                list.forEach((item) => {
                    newArray.push(
                        this.addOrderToArray(item)
                    )
                }); 
                this.setState({ orders: newArray})
            });
        })

    }

    const addrider = () => {

      // post to api
      let name = document.getElementById("name").value;
      let password = document.getElementById("password").value;

      if (name === "") {
          this.setState({error_message: "Please insert Name"})
          return false
      } else if (password === "") {
          this.setState({error_message: "Please insert Password"})
          return false
      }

      let add_rider = fetch('http://localhost:8080/api/addrider', {  
            method: 'POST'
        }).then((data) => {
          if (data.status === 200) {
            console.log("added rider")
          }
        })
    }

    if (this.state.count === 1) {
        RequestMapping();
        this.state.count += 1;
    }

    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"></link>

      <Aside></Aside>

      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

      <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card my-4">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 class="text-white text-capitalize ps-3">Orders</h6>
                </div>
              </div>
              <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Address</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Store</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Client Name</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                        <th class="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                     {this.state.orders}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div class="container-fluid py-4">
        <div class="row">
          <div class="col-12">
            <div class="card my-4">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 class="text-white text-capitalize ps-3">Riders table</h6>
                </div>
              </div>
              <div class="card-body px-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Rider</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Location</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Review</th>
                        <th class="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.riders}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

            <div class="container my-auto" style={{paddingTop: 10}}>
                <div class="row">
                <div class="col-lg-5">
                    <div class="card-body">
                        <form role="form" class="text-start">
                        <div class="input-group input-group-outline my-3">
                            <input type="name" class="form-control" id="name" placeholder="Name"/>
                        </div>
                        <div class="input-group input-group-outline mb-3">
                            <input type="password" class="form-control" id="password" placeholder="Password"/>
                        </div>

                        <div class="text-center">
                            <button type="button" class="btn bg-gradient-secondary w-100 my-4 mb-2" onClick={{addrider}}>Add a Rider</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Management;
