var RemoveBtn = React.createClass({
  render: function() {
    return (
      <span onClick={this.props.clickHandler}>
        ×
      </span>
    );
  }
});

var Tag = React.createClass({
  removeTag: function() {
    this.props.remove(this.props.tag);
  },
  render: function() {
    return (
      <li className="tag">
        {this.props.tag}
        <RemoveBtn clickHandler={this.removeTag}/>
      </li>
    );
  }
});

var TagList = React.createClass({
  render: function() {
    var tags = this.props.tags.map(function(t) {
      return (
        <Tag tag={t} key={t} remove={this.props.remove}>
        </Tag>
      );
    }.bind(this));
    return (
      <ul className="tags">
        {tags}
      </ul>
    );
  }
});

var TagBox = React.createClass({
  getInitialState: function() {
    return {tags: []};
  },
  addTag: function(event){
    var v = event.target.value;
    if(v.trim() && (v.contains('\n') || v.contains(' '))) {
      if(this.state.tags.indexOf(v.split(/\W/)[0]) === -1) {
        this.setState({
          tags: this.state.tags.concat([
            v.split(/\W/)[0]
          ])
        });
      }
      event.target.value = '';
    }
  },
  removeTag: function(t) {
    var i = this.state.tags.indexOf(t),
      ts = this.state.tags;
    this.setState({
      tags: ts.slice(0,i).concat(ts.slice(i+1))
    });
  },
  render: function() {
    return (
      <div className="tag-container">
        <h3>Tag Input Example</h3>
        <TagList tags={this.state.tags} remove={this.removeTag} />
        <textarea onChange={this.addTag}></textarea>
      </div>
    );
  }
});

ReactDOM.render(
  <TagBox />,
  document.getElementById('content')
);
