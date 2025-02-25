import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'Stores/connect';

const FooterIconSeparator = () => <div className='footer-icon-separator' />;

const FooterExtensionRenderer = (footer_extension, idx) => {
    const { Component: FooterExtensionComponent } = footer_extension;
    return (
        <React.Fragment key={`footer-link-${footer_extension.position}-${idx}`}>
            {footer_extension.has_left_separator && <FooterIconSeparator />}
            <FooterExtensionComponent />
            {footer_extension.has_right_separator && <FooterIconSeparator />}
        </React.Fragment>
    );
};

const Footer = ({ footer_extensions, is_app_disabled, is_route_modal_on }) => {
    let footer_extensions_left = [];
    if (footer_extensions.filter) {
        footer_extensions_left = footer_extensions.filter(footer_extension => footer_extension.position === 'left');
    }

    return (
        <footer
            className={classNames('footer', {
                'footer--is-disabled': is_app_disabled || is_route_modal_on,
            })}
        >
            {footer_extensions_left.length > 0 && (
                <div className='footer__links footer__links--left'>
                    {footer_extensions_left.map(FooterExtensionRenderer)}
                </div>
            )}
        </footer>
    );
};

Footer.propTypes = {
    is_app_disabled: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_route_modal_on: PropTypes.bool,
    is_settings_modal_on: PropTypes.bool,
    landing_company_shortcode: PropTypes.string,
    location: PropTypes.object,
    toggleSettingsModal: PropTypes.func,
    settings_extension: PropTypes.array,
    is_virtual: PropTypes.bool,
    is_eu: PropTypes.bool,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    footer_extensions: PropTypes.array,
};

export default withRouter(
    connect(({ client, ui }) => ({
        enableApp: ui.enableApp,
        footer_extensions: ui.footer_extensions,
        settings_extension: ui.settings_extension,
        is_app_disabled: ui.is_app_disabled,
        is_route_modal_on: ui.is_route_modal_on,
        is_logged_in: client.is_logged_in,
        is_eu: client.is_eu,
        is_loading: ui.is_loading,
        is_settings_modal_on: ui.is_settings_modal_on,
        is_virtual: client.is_virtual,
        landing_company_shortcode: client.landing_company_shortcode,
        disableApp: ui.disableApp,
        toggleSettingsModal: ui.toggleSettingsModal,
    }))(Footer)
);
