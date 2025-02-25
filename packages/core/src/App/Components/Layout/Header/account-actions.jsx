import * as PropTypes from 'prop-types';
import React from 'react';
import { Button, DesktopWrapper, Icon, MobileWrapper, Popover } from '@deriv/components';
import { formatMoney, PlatformContext, moduleLoader } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { LoginButton } from './login-button.jsx';
import { SignupButton } from './signup-button.jsx';
import 'Sass/app/_common/components/account-switcher.scss';

const AccountInfo = React.lazy(() =>
    moduleLoader(() =>
        import(
            /* webpackChunkName: "account-info", webpackPreload: true */ 'App/Components/Layout/Header/account-info.jsx'
        )
    )
);

const AccountActions = React.memo(
    ({
        acc_switcher_disabled_message,
        account_type,
        balance,
        currency,
        country_standpoint,
        disableApp,
        enableApp,
        is_acc_switcher_on,
        is_acc_switcher_disabled,
        is_eu,
        is_logged_in,
        is_virtual,
        openRealAccountSignup,
        toggleAccountsDialog,
    }) => {
        const { is_appstore } = React.useContext(PlatformContext);

        if (is_logged_in) {
            return (
                <React.Fragment>
                    <MobileWrapper>
                        <React.Suspense fallback={<div />}>
                            <AccountInfo
                                acc_switcher_disabled_message={acc_switcher_disabled_message}
                                account_type={account_type}
                                balance={
                                    typeof balance === 'undefined' ? balance : formatMoney(currency, balance, true)
                                }
                                is_disabled={is_acc_switcher_disabled}
                                disableApp={disableApp}
                                enableApp={enableApp}
                                is_eu={is_eu}
                                is_virtual={is_virtual}
                                currency={currency}
                                country_standpoint={country_standpoint}
                                is_dialog_on={is_acc_switcher_on}
                                toggleDialog={toggleAccountsDialog}
                            />
                        </React.Suspense>
                    </MobileWrapper>
                    <DesktopWrapper>
                        <Popover
                            classNameBubble='account-settings-toggle__tooltip'
                            alignment='bottom'
                            message={<Localize i18n_default_text='Manage account settings' />}
                            should_disable_pointer_events
                            zIndex={9999}
                        >
                            <a
                                className='account-settings-toggle'
                                href={'https://app.deriv.com/account/personal-details'}
                                target='_blank' rel="noreferrer"
                            >
                                <Icon icon='IcUserOutline' />
                            </a>
                        </Popover>
                        <React.Suspense fallback={<div />}>
                            <AccountInfo
                                acc_switcher_disabled_message={acc_switcher_disabled_message}
                                account_type={account_type}
                                balance={
                                    typeof balance === 'undefined' ? balance : formatMoney(currency, balance, true)
                                }
                                is_disabled={is_acc_switcher_disabled}
                                is_eu={is_eu}
                                is_virtual={is_virtual}
                                currency={currency}
                                country_standpoint={country_standpoint}
                                is_dialog_on={is_acc_switcher_on}
                                toggleDialog={toggleAccountsDialog}
                            />
                        </React.Suspense>
                        {!is_virtual && !currency && (
                            <div className='set-currency'>
                                <Button
                                    onClick={() => openRealAccountSignup('set_currency')}
                                    has_effect
                                    type='button'
                                    text={localize('Set currency')}
                                    primary
                                />
                            </div>
                        )}
                        {currency && (
                            <a
                                className='account-settings-toggle'
                                href={'https://app.deriv.com/cashier/deposit'}
                                target='_blank' rel="noreferrer"
                            >
                                <Button className='acc-info__button' has_effect text={localize('Deposit')} primary />
                            </a>
                        )}
                    </DesktopWrapper>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <LoginButton className='acc-info__button' />
                <SignupButton className='acc-info__button' is_appstore={is_appstore} />
            </React.Fragment>
        );
    }
);

AccountActions.displayName = 'AccountActions';

AccountActions.propTypes = {
    acc_switcher_disabled_message: PropTypes.string,
    account_type: PropTypes.string,
    balance: PropTypes.any,
    currency: PropTypes.any,
    is_acc_switcher_disabled: PropTypes.any,
    is_eu: PropTypes.bool,
    disableApp: PropTypes.any,
    enableApp: PropTypes.any,
    country_standpoint: PropTypes.object,
    is_acc_switcher_on: PropTypes.any,
    is_logged_in: PropTypes.any,
    is_notifications_visible: PropTypes.any,
    is_virtual: PropTypes.any,
    notifications_count: PropTypes.any,
    openRealAccountSignup: PropTypes.func,
    toggleAccountsDialog: PropTypes.any,
};

export { AccountActions };
