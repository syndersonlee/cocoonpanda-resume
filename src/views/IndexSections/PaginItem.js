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
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class PaginItem extends React.Component {
    render() {
        return (

            <Pagination>
                <PaginationItem className={this.props.active === "1" ? 'active' : ''}>
                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        초급
                </PaginationLink>
                </PaginationItem>
                <PaginationItem className={this.props.active === "2" ? 'active' : ''}>
                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        중급
                </PaginationLink>
                </PaginationItem>
                <PaginationItem className={this.props.active === "3" ? 'active' : ''}>
                    <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                        상급
                </PaginationLink>
                </PaginationItem>
            </Pagination>

        );
    }
}

export default PaginItem;
