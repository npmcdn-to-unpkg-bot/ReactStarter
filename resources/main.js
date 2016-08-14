var libraries = [

    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},

];

var AnalogClock = React.createClass({
    getInitialState: function () {
        return { count: 0, timer: undefined }
    },

    componentDidMount: function () {
        var timerToken = setInterval(function () {
            this.setState({ count: this.state.count + 1 });
        }.bind(this), 1000);

        this.setState({ timer: timerToken });
    },

    componentWillUnmount: function () {
        //console.log('unmount');
        if (this.state.timerToken) clearInterval(this.state.timerToken);
    },

    render: function () {
        return <div> {new Date().toLocaleString() }</div>
    }
});

ReactDOM.render(<AnalogClock/>, document.getElementById('analogClock'));
var Timer = React.createClass({
    getInitialState: function () {
        return { secondElapsed: 1 }
    },
    changeTime: function () {
        this.setState({ secondElapsed: this.state.secondElapsed + 1 });
    },
    componentDidMount: function () {
        //console.log('hi', this);
        this.interval = setInterval(this.changeTime, 2000);
    },
    componentWillUnmount: function () {
        console.log("compoenent will unmount");
        clearInterval(this.interval);
    },
    render: function () {
        return (
            <div>
                Hi how r u
                <div>this is second elapsed timer {this.state.secondElapsed}</div>
            </div>
        )
    }
});
ReactDOM.render(<Timer/>, document.getElementById('content'));




var MarkdownEditor = React.createClass({
    getInitialState: function () {
        return { value: "hi type here to get some two way binding" }
    },
    rawmarkup: function () {
        return { __html: this.state.value };
    },
    handlechange: function (params) {
        //console.log('handle change');
        this.setState({ value: this.refs.txtarea.value });
    },
    render: function () {
        return (
            <div className="markdowneditior">
                <h3>Input</h3>
                <textarea ref="txtarea" onChange={this.handlechange} defaultValue={this.state.value}>
                </textarea>
                <h3>Output</h3>
                <div className="content" dangerouslySetInnerHTML={this.rawmarkup() }>

                </div>
            </div>
        )
    }
})

ReactDOM.render(<MarkdownEditor/>, document.getElementById('textarea'));






var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];
var Service = React.createClass({
    addNumber: function () {
        this.props.addTotal(this.props.price);
    },
    render: function () {
        //console.log(this);
        return (
            <p  onClick={this.addNumber}>{this.props.name} <b>${this.props.price.toFixed(2) }</b></p>
        )
    }
});
var ServiceChooser = React.createClass({

    getInitialState: function () {
        return { total: 0 }
    },
    addTotal: function (price) {
        this.setState({ total: this.state.total + price })
    },
    render: function () {
        var self = this;
        var services = this.props.items.map(function (val, index) {
            return <Service name={val.name} price={val.price} key={val.name} addTotal={self.addTotal}></Service>
        })
       // console.log(this);
        return (
            <div>
                <h1>Our services</h1>
                <div id="services">
                    {services}
                    <p id="total" >Total <b>${this.state.total.toFixed(2) }</b></p>
                </div>
            </div>
        )
    }
})

ReactDOM.render(<ServiceChooser items={services} />, document.getElementById('container'))


var arr = [8, 2, 5, 7, 4, 0];
//quickSort1(arr, 0, arr.length -1)


function quickSort1(arr, left, right) {

    var i = left;
    var j = right;
    var tmp;
    var pivotidx = (left + right) / 2;
    var pivot = parseInt(arr[pivotidx.toFixed()]);
   // console.log("arr", arr, "left", left, "right", right, "pivot", pivot);
    /* partition */
    while (i <= j) {
        while (parseInt(arr[i]) < pivot)
            i++;
        while (parseInt(arr[j]) > pivot)
            j--;
        if (i <= j) {
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }

    /* recursion */
    if (left < j)
        quickSort1(arr, left, j);
    if (i < right)
        quickSort1(arr, i, right);
    //console.log("arr2", arr);
    return arr;
}



var SearchExample= React.createClass({
    getInitialState : function (){
        return {value:''}
    },
    changeHndler : function(e){
      console.log("chnage handler",e.target.value);
      this.setState({value:e.target.value})
    },
    render : function (){
        var libraries=this.props.items;
        var searchString = this.state.value.trim().toLowerCase();
        if( searchString.length >0){
            libraries=libraries.filter(function (val){
                    return val.name.toLowerCase().match(searchString);
            })
        }
        return (
            <div>
             <input type="text" value={this.state.value} onChange={this.changeHndler}/>
             <div>
                <ul>
                {libraries.map(function (val,index){
                    return <li  key={val.name}>{val.name} <a href={val.url}>{val.url}</a></li>
                })}
                </ul>
             </div>
            </div>
        )
    }
});

// below is search container

ReactDOM.render(<SearchExample items={ libraries }/>,document.getElementById('container1'));