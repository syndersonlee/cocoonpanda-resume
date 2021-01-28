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
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class TabsSection extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1,
    thirdTabs : 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (
      <>
        <h3 className="h3 text-success font-weight-bold mb-4">My Backend Project</h3>
        <Row className="justify-content-center">
          <Col lg="6">
            {/* Tabs with icons */}
            <div className="mb-3">
              <h3 className="mt-3 text-uppercase font-weight-bold">
                  Plot
              </h3>
            </div>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    개요
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    기술 스택 & github 주소
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                    나의 역할
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <p>
                    영화 관심사를 기반으로 상호 간의 소개팅을 매칭시켜주는 어플리케이션입니다.
                    동아리 해커톤에서 3주 동안 서비스 프로토타입을 개발하였습니다.
                    프로토타입 구현 및 시현을 위해서 최다 매칭을 위하여
                    이분 매칭,DFS 그리고 랜덤 순서 & 필터링을 적용하였습니다.
                    </p>
                    <a href="https://github.com/TeamMoBo/plot-server">
                      <img
                        alt="..."
                        className="img-fluid rounded shadow"
                        src={require("images/Plot.png")}
                        style={{ width: "150px" }}
                      />
                    </a>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <p>
                      개발 담당 – Server<br/>
                      언어 : Javascript<br/>
                      프레임워크 : Express.js<br/>
                      클라우드 : AWS<br/>
                      데이터베이스 : MySQL
                    </p>
                    <p class="description">https://github.com/TeamMoBo/plot-server</p>
                  </TabPane>
                  <TabPane tabId="iconTabs3">
                    <p>나의 역할</p>
                    <p className="description">
                      개발 프로젝트 리더를 맡아서 전체 개발 IA를 설계하고 DB세팅을 담당하였습니다. 
                      AWS를 이용한 인프라 세팅과 git action 연동을 구현하였습니다.
                      소개팅 매칭에 필요한 알고리즘 개발과 소개팅 매칭 - 실패 - 연결 간 흘러가는 비즈니스 코드를 작성하였습니다.
                    </p>
                    <p>프레임워크 선택의 이유</p>
                    <p className="description">
                      Node.js는 싱글스레드 기반으로 프로젝트 세팅이 편하고 채팅 기능이 들어가는 만큼 socket.io로 확장가능성을 고려하고 팀원들이 다수 선호하여 선택하였습니다.
                      Push 알람 및 개발 난이도를 고려하여 Pub-Sub 방식보다는 Firestore로 Key값을 랜덤으로 생성하여 방을 만들고 클라이언트에서 로그를 가져가는 방식을 선택하였습니다.
                      또한 Ajax로 영화관 및 영화 정보를 쉽게 가져올 수 있는 점도 큰 장점이었습니다.
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
          <Col className="mt-5 mt-lg-0" lg="6">
            {/* Menu */}
            <div className="mb-3">
              <h3 className="mt-3 text-uppercase font-weight-bold">
                뭐라하지
              </h3>
            </div>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    개요
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    기술 스택 & github 주소
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "plainTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                    나의 역할
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                  <TabPane tabId="plainTabs1">
                    <p>
                    연말/연초에 어떤 인사말을 보내지? 고민하던 시간이 많았습니다
                    그런 문제를 소프트웨어적으로 해결해보고 개발 스펙트럼을 넓히고자 만들었습니다.
                    어플리케이션을 통해 연말연초에 자주 쓰는 단어를 제공하고 이를 상황별로 조합하여 인삿말을 제공하는 어플리케이션을 만들었습니다.
                    </p>
                    <a href="https://github.com/Nexters/what-do-you-say-server">
                      <img
                        alt="..."
                        className="img-fluid rounded shadow-lg"
                        src={require("images/뭐라하지.png")}
                        style={{ width: "150px" }}
                        onMouseOver="this.innerHTML='test'"
                      />
                    </a>
                  </TabPane>
                  <TabPane tabId="plainTabs2">
                    <p>
                      Typescript와 TypeORM을 통해서 Express.js로 개발하였습니다.
                      로그인은 OAuth2를 활용하여 개발하고 git action을 활용하여 CI/CD를 구현하였습니다.
                    </p>
                    <p>
                      개발 스택 – Server<br/>
                      언어 : Typescript<br/>
                      프레임워크 : Node.js, Express.js, TypeORM<br/>
                      클라우드 : AWS<br/>
                      데이터베이스 : MySQL
                    </p>
                    <p class="description">https://github.com/Nexters/what-do-you-say-server</p>
                  </TabPane>
                  <TabPane tabId="plainTabs3">
                  <p>나의 역할</p>
                    <p className="description">
                      기존에 반복되는 인프라 구조에서 새로운 방식을 접하기 위해 학습자의 입장으로 프로젝트 비즈니스 로직 개발에만 몰두 하였습니다.
                      Express.js를 Docker, Typescript, TypeORM의 개념을 최초로 적용하여 백엔드 개발을 해보았습니다.
                    </p>
                    <p>프레임워크 선택의 이유</p>
                    <p className="description">
                      Javascript는 class와 타입지정이 없기에 자바에서 흔히 쓰이는 디자인 패턴을 적용하기 어려웠습니다.
                      디자인 패턴을 프로젝트 구조에 적용하기 위해서 Domain 별로 싱글턴패턴으로 작업하였습니다.
                      비즈니스 로직 상 큰 어려움은 없었지만 새로운 프레임워크를 통해 선택지를 넓히고자 해당 프레임워크를 선택하였습니다.
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6">
            {/* Tabs with icons */}
            <div className="mb-3">
              <h3 className="mt-3 text-uppercase font-weight-bold">
                  Cake-it
              </h3>
            </div>
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.thirdTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "thirdTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    개요
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.thirdTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "thirdTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    기술 스택 & github 주소
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.thirdTabs === 3}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 3
                    })}
                    onClick={e => this.toggleNavs(e, "thirdTabs", 3)}
                    href="#pablo"
                    role="tab"
                  >
                    나의 역할
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"thirdTabs" + this.state.thirdTabs}>
                  <TabPane tabId="thirdTabs1">
                    <p>
                    레터링 케이크를 판매하기 위한 어플리케이션 입니다.
                    개발 실력 향상을 위해 프로토타입 개발에 도움을 주고 있습니다
                    위치, 지도, 검색어 기반으로 레터링 케이크 가게를 연결해주는 어플리케이션입니다.
                    </p>
                    <a href="https://github.com/project-cake-it/api-server">
                      <img
                        alt="..."
                        className="img-fluid rounded shadow"
                        src={require("images/Cake-it.png")}
                        style={{ width: "150px" }}
                      />
                    </a>
                  </TabPane>
                  <TabPane tabId="thirdTabs2">
                    <p>
                    OAuth2를 이용하여 인증을 구현하고, JPA를 이용하여 구성하였습니다
                    Git Action을 통해서 CI/CD를 관리하였습니다
                    AWS의 EC2/RDS/S3를 이용하여 단기간에 프로토타입을 완성하였습니다
                    </p>
                    <p>
                    개발 담당 – Server<br/>
                    언어 : JAVA<br/>
                    프레임워크 : Spring Boot, JPA<br/>
                    클라우드 : AWS<br/>
                    데이터베이스 : MySQL
                    </p>
                    <p class="description">https://github.com/project-cake-it/api-server</p>
                  </TabPane>
                  <TabPane tabId="thirdTabs3">
                  <p>나의 역할</p>
                    <p className="description">
                      OAuth2를 활용해서 네이버/카카오 인증을 구현하는 역할을 담당하였습니다.
                      또한 이미지 resizing을 통해 들어오는 이미지를 소형화하는 로직을 aws lambda를 활용하여 작성하였습니다.
                    </p>
                    <p>프레임워크 선택의 이유</p>
                    <p className="description">
                      쇼핑몰 시스템은 구조 상 기능이 많고 처리해야할 데이터가 많기 때문에 컨트롤러 마다 각자 역할을 나누어 개발을 할 수 있고 
                      AOP 및 DTO를 통해서 같이 사용할 수 있는 bean을 필요에 따라 가져와 사용할 수 있는 Spring Boot가 더 낫다고 판단하였습니다. 
                      쿼리를 변경하였을 때 비즈니스 로직 정합성 때문에 발생하는 문제를 줄이기 위해서 JPA를 활용하였습니다. 
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </>
    );
  }
}

export default TabsSection;
