const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const Field = ({name, placeholder, onChange, value}) => <div className="form-group">
    <input type="text" name={name} id={name} onChange={onChange} value={value} placeholder={placeholder} />
</div>;

const Checkbox = ({name, children, onChange}) => <div className="form-group">
    <label><input type="checkbox" name={name} id={name} onChange={onChange} className="mr-1" />{children}</label>
</div>;

const getProductsByCategory = category => products.filter(product => category === product.category);

const RowProduct = ({name, price, stocked}) => <tr>
    <td style={{color: stocked ? '' : 'red'}}>{name}</td>
    <td>{price}</td>
</tr>;


class Form extends React.Component {

    constructor(props) {
        super(props);
    }  

    render = () => <React.Fragment>
        <Field name="search" id="search" onChange={this.handleChangeInput} value="" placeholder="Search..." />
        <Checkbox name="onlyStock" id="onlyStock" onChange={this.handleChangeCheckbox}>Only show products in stock</Checkbox>
    </React.Fragment>;
}

class GroupProducts extends React.Component {

    constructor(props) {
        super(props);
        this.products = getProductsByCategory(this.props.category);
    }

    isProductPrinted = (product) => (product.name.toLowerCase().includes(this.props.search.toLowerCase()) || this.props.search === "") && (!this.props.checked || product.stocked);

    render = () => <React.Fragment>
        {this.products.filter((product) => this.isProductPrinted(product)).length === 0 ? null : <tr><th>{this.props.category}</th></tr>}
        {this.products.map((product, i) => this.isProductPrinted(product) ? <RowProduct name={product.name} price={product.price} stocked={product.stocked} key={i} /> : null)}
    </React.Fragment>;
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            checked: false
        };
    }

    handleChangeInput = (e) => {
        this.setState({
            search: e.target.value
        });
    }
    
    handleChangeCheckbox = (e) => {
        this.setState({
            checked: e.target.checked
        });
    }

    render = () => <div className="container" style={{width: "300px"}}>
        <Field name="search" id="search" onChange={this.handleChangeInput} value={this.state.search} placeholder="Search..." />
        <Checkbox name="onlyStock" id="onlyStock" onChange={this.handleChangeCheckbox}>Only show products in stock</Checkbox>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <GroupProducts category="Sporting Goods" search={this.state.search} checked={this.state.checked} />
                <GroupProducts category="Electronics" search={this.state.search} checked={this.state.checked} />
            </tbody>
        </table>
    </div>;
}

ReactDOM.render(<Home />, document.querySelector('#app'));