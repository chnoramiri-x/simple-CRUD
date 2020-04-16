import React, { Component } from 'react';

class Pagination extends Component {
    state = {}
    generate = () => {
        const currentPage = this.props.currentPage;
        let items = [];
        for (let i = 1; i <= this.props.totalPage; i++) {
            items.push(<li key={i} className={i === currentPage ? "active page-item" : "page-item"}>
                <a onClick={() => this.props.goToPage(i)} className="page-link" href="#">{i}</a></li>)
        }
        return items;
    }
    render() {

        return (
            <div>
                <nav >
                    <ul className="pagination">
                        {this.generate()}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Pagination;