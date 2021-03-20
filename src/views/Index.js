/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)
** commit 채우기용 
* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import TopSection from "./IndexSections/TopSection.js";
import Mainproject from "./IndexSections/Mainproject.js";
import Awards from "./IndexSections/Awards.js";
import Experience from "./IndexSections/Experience.js";
import Skill from "./IndexSections/Skill.js";
import Sideproject from "./IndexSections/Sideproject.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <TopSection />
          <section className="section section-components">
            <Container>
              <Mainproject />
              <Sideproject />
              <Awards />
              <Experience />
            </Container>
          </section>
          <Skill />
        </main>
      </>
    );
  }
}

export default Index;
