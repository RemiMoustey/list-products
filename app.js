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
    <input type="checkbox" name={name} id={name} onChange={onChange} className="mr-1" />
    <label>{children}</label>
</div>;

const getProductsByCategory = category => products.filter(product => category === product.category);

const RowProduct = ({name, price, stocked}) =><tr>
    <td style={{color: stocked ? '' : 'red'}}>{name}</td>
    <td>{price}</td>
    </tr>


class Form extends React.Component {
    handleChangeInput = () => {

    }
    
    handleChangeCheckbox = () => {
        
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

    render = () => <React.Fragment>
            <tr><th>{this.props.category}</th></tr>
            {this.products.map((product) => <RowProduct name={product.name} price={product.price} stocked={product.stocked} />)}
        </React.Fragment>
}

class Home extends React.Component {
    render = () => <div className="container">
        <Form />
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <GroupProducts category="Sporting Goods" />
                <GroupProducts category="Electronics" />
            </tbody>
        </table>
    </div>;
}

ReactDOM.render(<Home />, document.querySelector('#app'));