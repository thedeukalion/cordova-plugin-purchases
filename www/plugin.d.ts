declare global {
    interface Window {
        cordova: any;
        plugins: any;
    }
}
export declare enum ATTRIBUTION_NETWORK {
    APPLE_SEARCH_ADS = 0,
    ADJUST = 1,
    APPSFLYER = 2,
    BRANCH = 3,
    TENJIN = 4,
    FACEBOOK = 5
}
export declare enum PURCHASE_TYPE {
    /**
     * A type of SKU for in-app products.
     */
    INAPP = "inapp",
    /**
     * A type of SKU for subscriptions.
     */
    SUBS = "subs"
}
export declare enum PRORATION_MODE {
    UNKNOWN_SUBSCRIPTION_UPGRADE_DOWNGRADE_POLICY = 0,
    /**
     * Replacement takes effect immediately, and the remaining time will be
     * prorated and credited to the user. This is the current default behavior.
     */
    IMMEDIATE_WITH_TIME_PRORATION = 1,
    /**
     * Replacement takes effect immediately, and the billing cycle remains the
     * same. The price for the remaining period will be charged. This option is
     * only available for subscription upgrade.
     */
    IMMEDIATE_AND_CHARGE_PRORATED_PRICE = 2,
    /**
     * Replacement takes effect immediately, and the new price will be charged on
     * next recurrence time. The billing cycle stays the same.
     */
    IMMEDIATE_WITHOUT_PRORATION = 3,
    /**
     * Replacement takes effect when the old plan expires, and the new price will
     * be charged at the same time.
     */
    DEFERRED = 4
}
export declare enum PACKAGE_TYPE {
    /**
     * A package that was defined with a custom identifier.
     */
    UNKNOWN = "UNKNOWN",
    /**
     * A package that was defined with a custom identifier.
     */
    CUSTOM = "CUSTOM",
    /**
     * A package configured with the predefined lifetime identifier.
     */
    LIFETIME = "LIFETIME",
    /**
     * A package configured with the predefined annual identifier.
     */
    ANNUAL = "ANNUAL",
    /**
     * A package configured with the predefined six month identifier.
     */
    SIX_MONTH = "SIX_MONTH",
    /**
     * A package configured with the predefined three month identifier.
     */
    THREE_MONTH = "THREE_MONTH",
    /**
     * A package configured with the predefined two month identifier.
     */
    TWO_MONTH = "TWO_MONTH",
    /**
     * A package configured with the predefined monthly identifier.
     */
    MONTHLY = "MONTHLY",
    /**
     * A package configured with the predefined weekly identifier.
     */
    WEEKLY = "WEEKLY"
}
export declare enum INTRO_ELIGIBILITY_STATUS {
    /**
     * RevenueCat doesn't have enough information to determine eligibility.
     */
    INTRO_ELIGIBILITY_STATUS_UNKNOWN = 0,
    /**
     * The user is not eligible for a free trial or intro pricing for this product.
     */
    INTRO_ELIGIBILITY_STATUS_INELIGIBLE = 1,
    /**
     * The user is eligible for a free trial or intro pricing for this product.
     */
    INTRO_ELIGIBILITY_STATUS_ELIGIBLE = 2
}
/**
 * The EntitlementInfo object gives you access to all of the information about the status of a user entitlement.
 */
export interface PurchasesEntitlementInfo {
    /**
     * The entitlement identifier configured in the RevenueCat dashboard
     */
    readonly identifier: string;
    /**
     * True if the user has access to this entitlement
     */
    readonly isActive: boolean;
    /**
     * True if the underlying subscription is set to renew at the end of the billing period (expirationDate).
     * Will always be True if entitlement is for lifetime access.
     */
    readonly willRenew: boolean;
    /**
     * The last period type this entitlement was in. Either: NORMAL, INTRO, TRIAL.
     */
    readonly periodType: string;
    /**
     * The latest purchase or renewal date for the entitlement.
     */
    readonly latestPurchaseDate: string;
    /**
     * The first date this entitlement was purchased.
     */
    readonly originalPurchaseDate: string;
    /**
     * The expiration date for the entitlement, can be `null` for lifetime access. If the `periodType` is `trial`,
     * this is the trial expiration date.
     */
    readonly expirationDate: string | null;
    /**
     * The store where this entitlement was unlocked from. Either: appStore, macAppStore, playStore, stripe,
     * promotional, unknownStore
     */
    readonly store: string;
    /**
     * The product identifier that unlocked this entitlement
     */
    readonly productIdentifier: string;
    /**
     * False if this entitlement is unlocked via a production purchase
     */
    readonly isSandbox: boolean;
    /**
     * The date an unsubscribe was detected. Can be `null`.
     *
     * @note: Entitlement may still be active even if user has unsubscribed. Check the `isActive` property.
     */
    readonly unsubscribeDetectedAt: string | null;
    /**
     * The date a billing issue was detected. Can be `null` if there is no billing issue or an issue has been resolved
     *
     * @note: Entitlement may still be active even if there is a billing issue. Check the `isActive` property.
     */
    readonly billingIssueDetectedAt: string | null;
}
/**
 * Contains all the entitlements associated to the user.
 */
export interface PurchasesEntitlementInfos {
    /**
     * Map of all EntitlementInfo (`PurchasesEntitlementInfo`) objects (active and inactive) keyed by entitlement identifier.
     */
    readonly all: {
        [key: string]: PurchasesEntitlementInfo;
    };
    /**
     * Map of active EntitlementInfo (`PurchasesEntitlementInfo`) objects keyed by entitlement identifier.
     */
    readonly active: {
        [key: string]: PurchasesEntitlementInfo;
    };
}
export interface PurchasesTransaction {
    /**
     * RevenueCat Id associated to the transaction.
     */
    readonly revenueCatId: string;
    /**
     * Product Id associated with the transaction.
     */
    readonly productId: string;
    /**
     * Purchase date of the transaction in ISO 8601 format.
     */
    readonly purchaseDate: string;
}
export interface PurchaserInfo {
    /**
     * Entitlements attached to this purchaser info
     */
    readonly entitlements: PurchasesEntitlementInfos;
    /**
     * Set of active subscription skus
     */
    readonly activeSubscriptions: [string];
    /**
     * Set of purchased skus, active and inactive
     */
    readonly allPurchasedProductIdentifiers: [string];
    /**
     * Returns all the non-subscription purchases a user has made.
     * The purchases are ordered by purchase date in ascending order.
     */
    readonly nonSubscriptionTransactions: PurchasesTransaction[];
    /**
     * The latest expiration date of all purchased skus
     */
    readonly latestExpirationDate: string | null;
    /**
     * The date this user was first seen in RevenueCat.
     */
    readonly firstSeen: string;
    /**
     * The original App User Id recorded for this user.
     */
    readonly originalAppUserId: string;
    /**
     * Date when this info was requested
     */
    readonly requestDate: string;
    /**
     * Map of skus to expiration dates
     */
    readonly allExpirationDates: {
        [key: string]: string | null;
    };
    /**
     * Map of skus to purchase dates
     */
    readonly allPurchaseDates: {
        [key: string]: string | null;
    };
    /**
     * Returns the version number for the version of the application when the
     * user bought the app. Use this for grandfathering users when migrating
     * to subscriptions.
     *
     * This corresponds to the value of CFBundleVersion (in iOS) in the
     * Info.plist file when the purchase was originally made. This is always null
     * in Android
     */
    readonly originalApplicationVersion: string | null;
    /**
     * Returns the purchase date for the version of the application when the user bought the app.
     * Use this for grandfathering users when migrating to subscriptions.
     */
    readonly originalPurchaseDate: string | null;
    /**
     * URL to manage the active subscription of the user. If this user has an active iOS
     * subscription, this will point to the App Store, if the user has an active Play Store subscription
     * it will point there. If there are no active subscriptions it will be null.
     * If there are multiple for different platforms, it will point to the device store.
     */
    readonly managementURL: string | null;
}
export interface PurchasesProduct {
    /**
     * Product Id.
     */
    readonly identifier: string;
    /**
     * Description of the product.
     */
    readonly description: string;
    /**
     * Title of the product.
     */
    readonly title: string;
    /**
     * Price of the product in the local currency.
     */
    readonly price: number;
    /**
     * Formatted price of the item, including its currency sign, such as €3.99.
     */
    readonly price_string: string;
    /**
     * Currency code for price and original price.
     */
    readonly currency_code: string;
    /**
     * Introductory price of a subscription in the local currency.
     */
    readonly intro_price: number | null;
    /**
     * Formatted introductory price of a subscription, including its currency sign, such as €3.99.
     */
    readonly intro_price_string: string | null;
    /**
     * Billing period of the introductory price, specified in ISO 8601 format.
     */
    readonly intro_price_period: string | null;
    /**
     * Number of subscription billing periods for which the user will be given the introductory price, such as 3.
     */
    readonly intro_price_cycles: number | null;
    /**
     * Unit for the billing period of the introductory price, can be DAY, WEEK, MONTH or YEAR.
     */
    readonly intro_price_period_unit: string | null;
    /**
     * Number of units for the billing period of the introductory price.
     */
    readonly intro_price_period_number_of_units: number | null;
}
/**
 * Contains information about the product available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesPackage {
    /**
     * Unique identifier for this package. Can be one a predefined package type or a custom one.
     */
    readonly identifier: string;
    /**
     * Package type for the product. Will be one of [PACKAGE_TYPE].
     */
    readonly packageType: PACKAGE_TYPE;
    /**
     * Product assigned to this package.
     */
    readonly product: PurchasesProduct;
    /**
     * Offering this package belongs to.
     */
    readonly offeringIdentifier: string;
}
/**
 * An offering is a collection of Packages (`PurchasesPackage`) available for the user to purchase.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOffering {
    /**
     * Unique identifier defined in RevenueCat dashboard.
     */
    readonly identifier: string;
    /**
     * Offering description defined in RevenueCat dashboard.
     */
    readonly serverDescription: string;
    /**
     * Array of `Package` objects available for purchase.
     */
    readonly availablePackages: [PurchasesPackage];
    /**
     * Lifetime package type configured in the RevenueCat dashboard, if available.
     */
    readonly lifetime: PurchasesPackage | null;
    /**
     * Annual package type configured in the RevenueCat dashboard, if available.
     */
    readonly annual: PurchasesPackage | null;
    /**
     * Six month package type configured in the RevenueCat dashboard, if available.
     */
    readonly sixMonth: PurchasesPackage | null;
    /**
     * Three month package type configured in the RevenueCat dashboard, if available.
     */
    readonly threeMonth: PurchasesPackage | null;
    /**
     * Two month package type configured in the RevenueCat dashboard, if available.
     */
    readonly twoMonth: PurchasesPackage | null;
    /**
     * Monthly package type configured in the RevenueCat dashboard, if available.
     */
    readonly monthly: PurchasesPackage | null;
    /**
     * Weekly package type configured in the RevenueCat dashboard, if available.
     */
    readonly weekly: PurchasesPackage | null;
}
/**
 * Contains all the offerings configured in RevenueCat dashboard.
 * For more info see https://docs.revenuecat.com/docs/entitlements
 */
export interface PurchasesOfferings {
    /**
     * Map of all Offerings [PurchasesOffering] objects keyed by their identifier.
     */
    readonly all: {
        [key: string]: PurchasesOffering;
    };
    /**
     * Current offering configured in the RevenueCat dashboard.
     */
    readonly current: PurchasesOffering | null;
}
export interface PurchasesError {
    code: number;
    message: string;
    readableErrorCode: string;
    underlyingErrorMessage?: string;
}
/**
 * Holds the information used when upgrading from another sku. For Android use only.
 */
export interface UpgradeInfo {
    /**
     * The oldSKU to upgrade from.
     */
    readonly oldSKU: string;
    /**
     * The [PRORATION_MODE] to use when upgrading the given oldSKU.
     */
    readonly prorationMode?: PRORATION_MODE;
}
/**
 * Holds the introductory price status
 */
export interface IntroEligibility {
    /**
     * The introductory price eligibility status
     */
    readonly status: INTRO_ELIGIBILITY_STATUS;
    /**
     * Description of the status
     */
    readonly description: string;
}
export declare type ShouldPurchasePromoProductListener = (deferredPurchase: () => void) => void;
declare class Purchases {
    /**
     * @deprecated use ATTRIBUTION_NETWORK instead
     *
     * Enum for attribution networks
     * @readonly
     * @enum {Number}
     */
    static ATTRIBUTION_NETWORKS: typeof ATTRIBUTION_NETWORK;
    /**
     * Enum for attribution networks
     * @readonly
     * @enum {Number}
     */
    static ATTRIBUTION_NETWORK: typeof ATTRIBUTION_NETWORK;
    /**
     * Supported SKU types.
     * @readonly
     * @enum {string}
     */
    static PURCHASE_TYPE: typeof PURCHASE_TYPE;
    /**
     * Replace SKU's ProrationMode.
     * @readonly
     * @enum {number}
     */
    static PRORATION_MODE: typeof PRORATION_MODE;
    /**
     * Enumeration of all possible Package types.
     * @readonly
     * @enum {string}
     */
    static PACKAGE_TYPE: typeof PACKAGE_TYPE;
    /**
     * Enum of different possible states for intro price eligibility status.
     * @readonly
     * @enum {number}
     */
    static INTRO_ELIGIBILITY_STATUS: typeof INTRO_ELIGIBILITY_STATUS;
    /**
     * Sets up Purchases with your API key and an app user id.
     * @param {string} apiKey RevenueCat API Key. Needs to be a string
     * @param {string?} appUserID A unique id for identifying the user
     * @param {boolean} observerMode An optional boolean. Set this to TRUE if you have your own IAP implementation and
     * want to use only RevenueCat's backend. Default is FALSE. If you are on Android and setting this to ON, you will have
     * to acknowledge the purchases yourself.
     * @param {string?} userDefaultsSuiteName An optional string. iOS-only, will be ignored for Android.
     * Set this if you would like the RevenueCat SDK to store its preferences in a different NSUserDefaults
     * suite, otherwise it will use standardUserDefaults. Default is null, which will make the SDK use standardUserDefaults.
     */
    static setup(apiKey: string, appUserID?: string | null, observerMode?: boolean, userDefaultsSuiteName?: string): void;
    /**
     * Set this to true if you are passing in an appUserID but it is anonymous, this is true by default if you didn't pass an appUserID
     * If a user tries to purchase a product that is active on the current app store account, we will treat it as a restore and alias
     * the new ID with the previous id.
     * @param {boolean} allowSharing true if enabled, false to disabled
     */
    static setAllowSharingStoreAccount(allowSharing: boolean): void;
    /**
     * Add a dict of attribution information
     *
     * @deprecated Use the set<NetworkId> functions instead.
     *
     * @param {object} data Attribution data from any of the attribution networks in Purchases.ATTRIBUTION_NETWORKS
     * @param {ATTRIBUTION_NETWORK} network Which network, see Purchases.ATTRIBUTION_NETWORK
     * @param {string?} networkUserId An optional unique id for identifying the user. Needs to be a string.
     */
    static addAttributionData(data: {
        [key: string]: any;
    }, network: ATTRIBUTION_NETWORK, networkUserId?: string): void;
    /**
     * Gets the Offerings configured in the RevenueCat dashboard
     * @param {function(PurchasesOfferings):void} callback Callback triggered after a successful getOfferings call.
     * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving offerings.
     */
    static getOfferings(callback: (offerings: PurchasesOfferings) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * Fetch the product info
     * @param {[string]} productIdentifiers Array of product identifiers
     * @param {function(PurchasesProduct[]):void} callback Callback triggered after a successful getProducts call. It will receive an array of product objects.
     * @param {function(PurchasesError):void} errorCallback Callback triggered after an error or when retrieving products
     * @param {PURCHASE_TYPE} type Optional type of products to fetch, can be inapp or subs. Subs by default
     */
    static getProducts(productIdentifiers: string[], callback: (products: PurchasesProduct[]) => void, errorCallback: (error: PurchasesError) => void, type?: PURCHASE_TYPE): void;
    /**
     * Make a purchase
     *
     * @param {string} productIdentifier The product identifier of the product you want to purchase.
     * @param {function(string, PurchaserInfo):void} callback Callback triggered after a successful purchase.
     * @param {function(PurchasesError, boolean):void} errorCallback Callback triggered after an error or when the user cancels the purchase.
     * If user cancelled, userCancelled will be true
     * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
     * and the optional prorationMode.
     * @param {PURCHASE_TYPE} type Optional type of product, can be inapp or subs. Subs by default
     */
    static purchaseProduct(productIdentifier: string, callback: ({ productIdentifier, purchaserInfo, }: {
        productIdentifier: string;
        purchaserInfo: PurchaserInfo;
    }) => void, errorCallback: ({ error, userCancelled, }: {
        error: PurchasesError;
        userCancelled: boolean;
    }) => void, upgradeInfo?: UpgradeInfo | null, type?: PURCHASE_TYPE): void;
    /**
     * Make a purchase
     *
     * @param {PurchasesPackage} aPackage The Package you wish to purchase. You can get the Packages by calling getOfferings
     * @param {function(string, PurchaserInfo):void} callback Callback triggered after a successful purchase.
     * @param {function(PurchasesError, boolean):void} errorCallback Callback triggered after an error or when the user cancels the purchase.
     * If user cancelled, userCancelled will be true
     * @param {UpgradeInfo} upgradeInfo Android only. Optional UpgradeInfo you wish to upgrade from containing the oldSKU
     * and the optional prorationMode.
     */
    static purchasePackage(aPackage: PurchasesPackage, callback: ({ productIdentifier, purchaserInfo, }: {
        productIdentifier: string;
        purchaserInfo: PurchaserInfo;
    }) => void, errorCallback: ({ error, userCancelled, }: {
        error: PurchasesError;
        userCancelled: boolean;
    }) => void, upgradeInfo?: UpgradeInfo | null): void;
    /**
     * Restores a user's previous purchases and links their appUserIDs to any user's also using those purchases.
     * @param {function(PurchaserInfo):void} callback Callback that will receive the new purchaser info after restoring transactions.
     * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem restoring the user transactions. This gets normally triggered if there
     * is an error retrieving the new purchaser info for the new user or the user cancelled the restore
     */
    static restoreTransactions(callback: (purchaserInfo: PurchaserInfo) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * Get the appUserID that is currently in placed in the SDK
     * @param {function(string):void} callback Callback that will receive the current appUserID
     */
    static getAppUserID(callback: (appUserID: string) => void): void;
    /**
     * This function will alias two appUserIDs together.
     * @param {string} newAppUserID The new appUserID that should be linked to the currently identified appUserID. Needs to be a string.
     * @param {function(PurchaserInfo):void} callback Callback that will receive the new purchaser info after creating the alias
     * @param {function(PurchasesError):void} errorCallback Callback that will be triggered whenever there is any problem creating the alias. This gets normally triggered if there
     * is an error retrieving the new purchaser info for the new user or there is an error creating the alias.
     */
    static createAlias(newAppUserID: string, callback: (purchaserInfo: PurchaserInfo) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * This function will identify the current user with an appUserID. Typically this would be used after a logout to identify a new user without calling configure
     * @param {string} newAppUserID The appUserID that should be linked to the currently user
     * @param {function(PurchaserInfo):void} callback Callback that will receive the new purchaser info after identifying.
     * @param {function(PurchasesError, boolean):void} errorCallback Callback that will be triggered whenever there is any problem identifying the new user. This gets normally triggered if there
     * is an error retrieving the new purchaser info for the new user.
     */
    static identify(newAppUserID: string, callback: (purchaserInfo: PurchaserInfo) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * Resets the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
     * @param {function(PurchaserInfo):void} callback Callback that will receive the new purchaser info after resetting
     * @param {function(PurchasesError, boolean):void} errorCallback Callback that will be triggered whenever there is any problem resetting the SDK. This gets normally triggered if there
     * is an error retrieving the new purchaser info for the new user.
     */
    static reset(callback: (purchaserInfo: PurchaserInfo) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * Gets the current purchaser info. This call will return the cached purchaser info unless the cache is stale, in which case,
     * it will make a network call to retrieve it from the servers.
     * @param {function(PurchaserInfo):void} callback Callback that will receive the purchaser info
     * @param {function(PurchasesError, boolean):void} errorCallback Callback that will be triggered whenever there is any problem retrieving the purchaser info
     */
    static getPurchaserInfo(callback: (purchaserInfo: PurchaserInfo) => void, errorCallback: (error: PurchasesError) => void): void;
    /**
     * Enables/Disables debugs logs
     * @param {boolean} enabled Enable or not debug logs
     */
    static setDebugLogsEnabled(enabled: boolean): void;
    /**
     * iOS only.
     * @param {boolean} simulatesAskToBuyInSandbox Set this property to true *only* when testing the ask-to-buy / SCA purchases flow.
     * More information: http://errors.rev.cat/ask-to-buy
     */
    static setSimulatesAskToBuyInSandbox(enabled: boolean): void;
    /**
     * This method will send all the purchases to the RevenueCat backend. Call this when using your own implementation
     * for subscriptions anytime a sync is needed, like after a successful purchase.
     *
     * @warning This function should only be called if you're not calling makePurchase.
     */
    static syncPurchases(): void;
    /**
     * Enable automatic collection of Apple Search Ads attribution. Disabled by default.
     *
     * @param {boolean} enabled Enable or not automatic collection
     */
    static setAutomaticAppleSearchAdsAttributionCollection(enabled: boolean): void;
    /**
     * @param {function(boolean):void} callback Will be sent a boolean indicating if the `appUserID` has been generated
     * by RevenueCat or not.
     */
    static isAnonymous(callback: (isAnonymous: boolean) => void): void;
    /**
     *  iOS only. Computes whether or not a user is eligible for the introductory pricing period of a given product.
     *  You should use this method to determine whether or not you show the user the normal product price or the
     *  introductory price. This also applies to trials (trials are considered a type of introductory pricing).
     *
     *  @note Subscription groups are automatically collected for determining eligibility. If RevenueCat can't
     *  definitively compute the eligibility, most likely because of missing group information, it will return
     *  `INTRO_ELIGIBILITY_STATUS_UNKNOWN`. The best course of action on unknown status is to display the non-intro
     *  pricing, to not create a misleading situation. To avoid this, make sure you are testing with the latest version of
     *  iOS so that the subscription group can be collected by the SDK. Android always returns INTRO_ELIGIBILITY_STATUS_UNKNOWN.
     *
     *  @param productIdentifiers Array of product identifiers for which you want to compute eligibility
     *  @param callback Will be sent a map of IntroEligibility per productId
     */
    static checkTrialOrIntroductoryPriceEligibility(productIdentifiers: string[], callback: (map: {
        [productId: string]: IntroEligibility;
    }) => void): void;
    /**
     * Sets a function to be called on purchases initiated on the Apple App Store. This is only used in iOS.
     * @param {ShouldPurchasePromoProductListener} shouldPurchasePromoProductListener Called when a user initiates a
     * promotional in-app purchase from the App Store. If your app is able to handle a purchase at the current time, run
     * the deferredPurchase function. If the app is not in a state to make a purchase: cache the deferredPurchase, then
     * call the deferredPurchase when the app is ready to make the promotional purchase.
     * If the purchase should never be made, you don't need to ever call the deferredPurchase and the app will not
     * proceed with promotional purchases.
     */
    static addShouldPurchasePromoProductListener(shouldPurchasePromoProductListener: ShouldPurchasePromoProductListener): void;
    /**
     * Removes a given ShouldPurchasePromoProductListener
     * @param {ShouldPurchasePromoProductListener} listenerToRemove ShouldPurchasePromoProductListener reference of the listener to remove
     * @returns {boolean} True if listener was removed, false otherwise
     */
    static removeShouldPurchasePromoProductListener(listenerToRemove: ShouldPurchasePromoProductListener): boolean;
    /**
     * Invalidates the cache for purchaser information.
     *
     * Most apps will not need to use this method; invalidating the cache can leave your app in an invalid state.
     * Refer to https://docs.revenuecat.com/docs/purchaserinfo#section-get-user-information for more information on
     * using the cache properly.
     *
     * This is useful for cases where purchaser information might have been updated outside of the
     * app, like if a promotional subscription is granted through the RevenueCat dashboard.
     */
    static invalidatePurchaserInfoCache(): void;
    /**
     * iOS only. Presents a code redemption sheet, useful for redeeming offer codes
     * Refer to https://docs.revenuecat.com/docs/ios-subscription-offers#offer-codes for more information on how
     * to configure and use offer codes.
     */
    static presentCodeRedemptionSheet(): void;
    /**
     * Subscriber attributes are useful for storing additional, structured information on a user.
     * Since attributes are writable using a public key they should not be used for
     * managing secure or sensitive information such as subscription status, coins, etc.
     *
     * Key names starting with "$" are reserved names used by RevenueCat. For a full list of key
     * restrictions refer to our guide: https://docs.revenuecat.com/docs/subscriber-attributes
     *
     * @param attributes Map of attributes by key. Set the value as an empty string to delete an attribute.
     */
    static setAttributes(attributes: {
        [key: string]: string | null;
    }): void;
    /**
     * Subscriber attribute associated with the email address for the user
     *
     * @param email Empty String or null will delete the subscriber attribute.
     */
    static setEmail(email: string | null): void;
    /**
     * Subscriber attribute associated with the phone number for the user
     *
     * @param phoneNumber Empty String or null will delete the subscriber attribute.
     */
    static setPhoneNumber(phoneNumber: string | null): void;
    /**
     * Subscriber attribute associated with the display name for the user
     *
     * @param displayName Empty String or null will delete the subscriber attribute.
     */
    static setDisplayName(displayName: string | null): void;
    /**
     * Subscriber attribute associated with the push token for the user
     *
     * @param pushToken Empty String or null will delete the subscriber attribute.
     */
    static setPushToken(pushToken: string | null): void;
    /**
     * Subscriber attribute associated with the Adjust Id for the user
     * Required for the RevenueCat Adjust integration
     *
     * @param adjustID Empty String or null will delete the subscriber attribute.
     */
    static setAdjustID(adjustID: string | null): void;
    /**
     * Subscriber attribute associated with the AppsFlyer Id for the user
     * Required for the RevenueCat AppsFlyer integration
     * @param appsflyerID Empty String or null will delete the subscriber attribute.
     */
    static setAppsflyerID(appsflyerID: string | null): void;
    /**
     * Subscriber attribute associated with the Facebook SDK Anonymous Id for the user
     * Recommended for the RevenueCat Facebook integration
     *
     * @param fbAnonymousID Empty String or null will delete the subscriber attribute.
     */
    static setFBAnonymousID(fbAnonymousID: string | null): void;
    /**
     * Subscriber attribute associated with the mParticle Id for the user
     * Recommended for the RevenueCat mParticle integration
     *
     * @param mparticleID Empty String or null will delete the subscriber attribute.
     */
    static setMparticleID(mparticleID: string | null): void;
    /**
     * Subscriber attribute associated with the OneSignal Player Id for the user
     * Required for the RevenueCat OneSignal integration
     *
     * @param onesignalID Empty String or null will delete the subscriber attribute.
     */
    static setOnesignalID(onesignalID: string | null): void;
    /**
     * Subscriber attribute associated with the install media source for the user
     *
     * @param mediaSource Empty String or null will delete the subscriber attribute.
     */
    static setMediaSource(mediaSource: string | null): void;
    /**
     * Subscriber attribute associated with the install campaign for the user
     *
     * @param campaign Empty String or null will delete the subscriber attribute.
     */
    static setCampaign(campaign: string | null): void;
    /**
     * Subscriber attribute associated with the install ad group for the user
     *
     * @param adGroup Empty String or null will delete the subscriber attribute.
     */
    static setAdGroup(adGroup: string | null): void;
    /**
     * Subscriber attribute associated with the install ad for the user
     *
     * @param ad Empty String or null will delete the subscriber attribute.
     */
    static setAd(ad: string | null): void;
    /**
     * Subscriber attribute associated with the install keyword for the user
     *
     * @param keyword Empty String or null will delete the subscriber attribute.
     */
    static setKeyword(keyword: string | null): void;
    /**
     * Subscriber attribute associated with the install ad creative for the user
     *
     * @param creative Empty String or null will delete the subscriber attribute.
     */
    static setCreative(creative: string | null): void;
    /**
     * Automatically collect subscriber attributes associated with the device identifiers.
     * $idfa, $idfv, $ip on iOS
     * $gpsAdId, $androidId, $ip on Android
     */
    static collectDeviceIdentifiers(): void;
    /**
     * Set this property to your proxy URL before configuring Purchases *only* if you've received a proxy key value from your RevenueCat contact.
     * @param url Proxy URL as a string.
     */
    static setProxyURL(url: string): void;
    private static setupShouldPurchasePromoProductCallback;
    private static getMakeDeferredPurchaseFunction;
}
export default Purchases;
