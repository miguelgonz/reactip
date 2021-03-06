var Name = React.createClass({
  render: function () {
    return (<div className="name">
        <div className="name__content">
            <div className="name__title">{this.props.title}</div>
            <div className="name__subtitle">{this.props.subtitle}</div>
        </div>
      </div>)
  }
});


var PlayButton = React.createClass({
  handlePlay: function () {
    console.log('play');
     this.props.onPlay();
  },
  render: function () {
    return (
      <div onClick={this.handlePlay} className="play-button">
        <span className="icon">►</span>
      </div>
    )
  }
});
    
var Carousel = React.createClass({
  getFirstHiddenOffset: function (backwards) {
      var offset = -1, $container = $(this.refs.container.getDOMNode()),
        containerMargin = parseInt($container.css('margin-left')),
        containerWidth = $container.outerWidth();
      return this.state.scroll + (backwards ? 1 : -1) * containerWidth;
  },
  getScrollWidth: function () {
      var mainWidth = this.refs.container.getDOMNode().scrollWidth;
      return mainWidth;
  },
  handleLeft: function () {
    var offset = -1, $container = $(this.refs.container.getDOMNode()),
        containerMargin = parseInt($container.css('margin-left')),
        containerWidth = $container.outerWidth();

    var newScroll = this.state.scroll + (backwards ? 1 : -1) * containerWidth;
    this.setState({scroll: newScroll});
  },
  handleRight: function () {
    var newScroll = this.getFirstHiddenOffset(false);
    this.setState({scroll: newScroll});
    console.log(this.state);
  },
  getInitialState: function () {
      return {
          scroll: 0,
      }
  },
  render: function () {
    var episodes = this.props.episodes.map(function (ep) {
      return (
        <div className="carousel__episode">
          <div className="episode__image"><img src="http://fillmurray.com/164/80"/></div>
          <div className="episode__title">{ep.title}</div>
          <div className="episode__subtitle">{ep.subtitle}</div>
        </div>
      )
    }),
    scroll = this.state.scroll;
    return (
      <div ref="container" className="carousel">
        <div className="carousel__episodes" style={{marginLeft: scroll + 'px'}}>{episodes}</div>
        <div className="carousel__buttons">
            <div onClick={this.handleLeft}>↜</div>
            <div onClick={this.handleRight}>↝</div>
        </div>
      </div>
    );
  }
});

var TIP = React.createClass({
  getInitialState: function () {
     return {
       hasPlaybackStarted: false
     };
  },
  startPlayback: function () {
    this.state.hasPlaybackStarted = true;
  },
  render: function () {
    var preplayClass = this.state.hasPlaybackStarted ? "is-hidden" : "is-visible";
    var episodes = this.props.data.episodes;
    var imgUrl = "http://ichef.bbci.co.uk/images/ic/608x342/" + this.props.data.pid + ".jpg"
    return (
      <div className="tip">
        <div className="tip__journey">
          <Carousel episodes={episodes}/>
        </div>
        <div className="tip__preplay" className={preplayClass}>
          <div className="tip__backdrop"><img src={imgUrl}/></div>
          <PlayButton onPlay={this.startPlayback}/>
          <Name title={this.props.data.title} subtitle={this.props.data.subtitle}/>
        </div>
      </div>
    );
  }
});
    
React.render(
  (
    <TIP data={data}/>
  ),
  document.getElementById('content')
);
