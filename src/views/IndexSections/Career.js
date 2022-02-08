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
          <h3 className="h3 text-primary font-weight-bold mt-md">
            Work Experience
          </h3>
          <br />
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://www.shinhan.com">
                <img
                  className="img-fluid"
                  alt="shinhan-bank"
                  src="https://blog.kakaocdn.net/dn/Iz97w/btqyXx4yZhO/3myJG9cf8ioKZ67PuYfeIK/img.jpg"
                  width="200px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>신한은행 NEXT추진팀 인프라플랫폼셀</h5>
              <p>2021-07 ~ NOW</p>
              <div className="mb-4">
                <p>신한은행 차세대 NEXT 프로젝트 단말-채널 업무 운영/관리</p>
                <li>채널통합 시스템 신규 개발 관리 업무 - <b>Java, Anylink7, Jeus</b></li>
                <li>채널큐 아키텍처 설계 업무 - <b>Kafka, Spring Boot, Undertow</b></li>
                <li>통합인터페이스로그 서버 구축 관리 - <b>Elastic Search, Kibana</b></li>
              </div>
            </Col>
          </Row>
          <br/>

          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://www.hyundai-autoever.com/">
                <img
                  className="img-fluid"
                  alt="autoever"
                  src="https://www.hyundai.co.kr/images/affiliates/others/img-autoever-logo.gif"
                  width="200px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>현대오토에버 경영데이터분석팀</h5>
              <p>2020.03 – 2021.02</p>
              <div className="mb-4">
                <p>현대/기아 해외 판매 법인 데이터 BI 레포트 차세대 프로젝트 개발</p>
                <li><b>JSP / JQuery</b>를 활용하여 웹 SSR 기반 웹 환경 구축 / RmateGrid.js 및 D3.js를 활용하여 차트 개발</li>
                <li><b>Spring Framework / MyBatis / Oracle / Tibero / Tomcat / Jeus Server / JSP</b> 활용</li>
              </div>
              <div className="mb-4">
                <p>Oracle / Tibero Database DW 테이블 관리 및 운영 업무</p>
                <li>본사 - 해외 법인 간 차량 판매 데이터 ETL 업무 및 현업 요구 사항에 따른 api 개발</li>
                <li>현업 로직 변경에 따른 SQL 변경 작업 및 DB 튜닝 업무</li>
              </div>
              <div>
                <b>SKILLS : Spring FrameworK(전자정부프레임워크) / MyBatis / Jeus Server / JQuery / Oracle, Tibero / SAP BW</b>
              </div>
            </Col>
          </Row>

          <br />

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
              <h5>CONCAT INC. React Native 개발 인턴</h5>
              <p>2018.12 – 2019.06</p>
              <li>
                미세먼지 데이터 제공 및 상품 판매 플랫폼 어플리케이션에 들어가는
                View를 <b>React Native</b>로 개발 어플리케이션으로 개발
              </li>
              <li>
                GCP의 <b>Cloud Function / Node.js</b>를 활용하여 Serverless로
                크롤링으로 DB에 저장하는 API를 개발
              </li>
              <br></br>
              <b>SKILLS : React Native / React Native Router / JSX / Node.js / Google Cloud Function</b>
            </Col>
          </Row>
          <br />
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
              <h5>㈜Neuro Associates 웹 개발 인턴</h5>
              <p>2018.06 – 2018.08</p>
              <li>
                <b>D3.js / Billboard.js / Toast.UI / Chart.js</b> 등의 차트
                라이브러리를 사용해서 클라이언트가 요구한 샘플을 작성
              </li>
              <li>
                차트의 로딩 속도 및 각 라이브러리로 만들 수 있는 차트를 분석한
                보고서 제작
              </li>
              <br></br>
              <b>SKILLS : Javascript / Typescript / D3.js / Billboard.js</b>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Experience;
