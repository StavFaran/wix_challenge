import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    deleteImg: PropTypes.func,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = (window).width / 5;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }
  rotateImg(){
    var newRotation = (this.state.rotation + 90) % 360;
    this.setState({
      rotation: newRotation
    });
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: 'rotate('+this.state.rotation+'deg)'}
        }
        >
        <div style={{transform: 'rotate('+(-this.state.rotation)+'deg)'}}>
          <FontAwesome className="image-icon" onClick={()=>this.rotateImg() } name="sync-alt" title="rotate"/>
          <FontAwesome className="image-icon" onClick={()=>this.props.deleteImg(this.props.dto) } name="trash-alt" title="delete"/>
          <FontAwesome className="image-icon" name="expand" title="expand"/>
        </div>
      </div>
    );
  }
}

export default Image;
