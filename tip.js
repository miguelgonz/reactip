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
  handleLeft: function () {
    console.log('go left');
  },
  handleRight: function () {
    console.log('go right');
  },
  render: function () {
    var episodes = this.props.episodes.map(function (ep) {
      return (
        <div className="episode">
          <div className="episode__image"><img src="http://fillmurray.com/200/120"/></div>
          <div className="episode__title">{ep.title}</div>
          <div className="episode__subtitle">{ep.subtitle}</div>
        </div>
      )
    });
    return (
      <div className="carousel">
        <div className="episodes">{episodes}</div>
        <div onClick={this.handleLeft}>↜</div>
        <div onClick={this.handleRight}>↝</div>
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
