import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="https://twitter.com/CampusNewx">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://web.facebook.com/bravosfoodgh">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                </ul>
                <p className="copyright text-muted">
                  Copyright &copy; Bravos Foodgh
                </p>
                <p className="copyright text-muted">
                  privacy & security <a href="1.1.0.">privacy</a>
                </p>
                <p className="copyright text-muted">
                  contact us <a href="https://wa.me/233543340697">contact</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}
