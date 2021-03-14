/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

class Experience extends React.Component {
  render() {
    return (
      <>
        <div id="exp-cmp" className="container">
          <h3 className="h3 text-danger font-weight-bold mt-md">Experience</h3>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="http://sopt.org">
                <img
                  className="img-fluid"
                  alt="sopt"
                  src={require("images/sopt.png")}
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2018.09 ~ 2019.08
              <p>
                <br />
                대학생 연합 IT벤처 창업 동아리 S.O.P.T
                <br />
                23,24기 서버파트
              </p>
            </Col>
          </Row>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://swmaestro.org/">
                <img
                  className="img-fluid"
                  alt="swm"
                  src="https://swmaestro.org/static/sw/images/logo_copy.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2019.06 ~ 2019.11
              <p>
                <br />
                10기 SW마에스트로 과정
                <br />
                Team greyGlass
              </p>
            </Col>
          </Row>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://neuroacs.com/">
                <img
                  className="img-fluid"
                  alt="nexters"
                  src={require("images/nexters.png")}
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2020.06 – NOW
              <br />
              <p>
                <br />
                개발자와 디자이너를 위한 IT 연합동아리 Nexters
                <br />
                17, 18기
              </p>
            </Col>
          </Row>
          <h3 className="h3 text-primary font-weight-bold mt-md">
            Work Experience
          </h3>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://neuroacs.com/">
                <img
                  className="img-fluid"
                  alt="neuroacs"
                  src="https://neuroacs.com/img/logo_neuro_big.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2018.06 – 2018.08
              <br />
              ㈜Neuro Associates 웹 개발 인턴
              <br />
              <br />
              <p>
                D3.js를 이용한 데이터 시각화
                <br />
                HTML / CSS / Javascript / D3.js
                <br />
              </p>
            </Col>
          </Row>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://concat.kr/">
                <img
                  className="img-fluid"
                  alt="concat"
                  src="https://concat.kr/images/concat-black-logo.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2018.12 – 2019.06
              <br />
              CONCAT INC. React Native 개발 인턴
              <br />
              <br />
              <p>
                미세먼지 정보 제공 및 제품 판매 어플 뷰 개발 ‘서울에어’
                <br />
                React Native / Node.js / Google Cloud Service
                <br />
              </p>
            </Col>
          </Row>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://www.hyundai-autoever.com/">
                <img
                  className="img-fluid"
                  alt="autoever"
                  src="https://www.hyundai.co.kr/images/affiliates/others/img-autoever-logo.gif"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              2020.03 – 2021.02
              <br />
              현대오토에버 경영데이터분석팀
              <br />
              <br />
              <p>
                현대-기아 판매법인 데이터 무결성 관리
                <br />
                Oracle ExaDB / Informatica PowerCenter
                <br />
                상용 차트 라이브러리 활용 대시보드 개발/운영
                <br />
                JSP(전자정부프레임워크) / Javascript
                <br />
              </p>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Experience;
