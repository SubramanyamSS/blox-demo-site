import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotifierWrapper } from './styled';

/**
 * This class describes a notifier.
 *
 * @class      Notifier (name)
 */
class Notifier extends Component {
  componentDidUpdate() {
    if (this.props.isShowing) {
      const timer = window.setTimeout(() => {
        window.clearTimeout(timer);
        this.props.hideNotifier();
      }, 5000);
    }
  }

  render() {
    const { isShowing, notification } = this.props;
    return (
      <NotifierWrapper>
        {
          isShowing && (
            <div
              key={Math.random()}
              style={{ top: '10%' }}
              className={`notifier ${notification.type}`}
            >
              <img
                alt="notification"
                className="img"
                src={`https://static-dev.vuetag.ai/assets/admin/images/${notification.type}.svg`}
              />
              <div className="content">
                <div className="text">{notification.type}</div>
                <div className="notifier-sub-text">{notification.message}</div>
              </div>
            </div>)
        }
      </NotifierWrapper>
    );
  }
}

Notifier.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hideNotifier: PropTypes.func.isRequired,
  notification: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default Notifier;
