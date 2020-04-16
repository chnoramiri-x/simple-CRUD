import React, { Component } from 'react';
import './Product.css'


class Product extends Component {
    state = { productList: [], isLoading: true }
    componentDidMount() {
        const apiUrl = 'http://apitester.ir/api/Products'
        fetch(apiUrl)
            .then(Response => Response.json())
            .then(data => this.setState({ productList: data, isLoading: false }))
    }
    render() {
        return (<div className='container'>
            <div className='row row2-product'>
                <div className='col-md-12 '>
                    {this.state.isLoading ?
                        <div className='alert alert-warning '>loading data...</div> :
                        <table className=' table-self table table-bordered '>
                            <thead className=''>
                                <tr>
                                    <th>productId</th>
                                    <th>productName</th>
                                    <th>unitPrice</th>
                                    <th>categoryId</th>
                                    <th>categoryName</th>
                                    <th>supplierId</th>
                                    <th>supplierName</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.productList.map(item => {
                                    return (
                                        <tr>
                                            <td>{item.productId}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.categoryId}</td>
                                            <td>{item.categoryName}</td>
                                            <td>{item.supplierId}</td>
                                            <td>{item.supplierName}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </div>);
    }
}
export default Product;