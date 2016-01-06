from .aws import *  # pylint: disable=wildcard-import, unused-wildcard-import
import urlparse


LABSTER_SETTINGS = ENV_TOKENS.get('LABSTER_SETTINGS', {})
LABSTER_AUTH = AUTH_TOKENS.get('LABSTER_AUTH', {})

FEATURES['CUSTOM_COURSES_EDX'] = True
FEATURES['SHOW_LABSTER_NOTIFICATION'] = False
LABSTER_FEATURES = {
    "ENABLE_WIKI": True,
}


ENV_LABSTER_FEATURES = LABSTER_SETTINGS.get('LABSTER_FEATURES', LABSTER_FEATURES)
for feature, value in ENV_LABSTER_FEATURES.items():
    FEATURES[feature] = value

INSTALLED_APPS += ('labster_course_license',)

LABSTER_WIKI_LINK = LABSTER_SETTINGS.get('LABSTER_WIKI_LINK', 'https://theory.labster.com/')
LABSTER_API_AUTH_TOKEN = LABSTER_AUTH.get('LABSTER_API_AUTH_TOKEN', '')

LABSTER_API_URL = LABSTER_SETTINGS.get('LABSTER_API_URL', 'http://staging-api2.labster.com')
LABSTER_ENDPOINTS = {
    'available_simulations': '',
    'consumer_secret': '',
}

ENV_LABSTER_ENDPOINTS = LABSTER_SETTINGS.get('LABSTER_ENDPOINTS', LABSTER_ENDPOINTS)
for endpoint, value in ENV_LABSTER_ENDPOINTS.items():
    LABSTER_ENDPOINTS[endpoint] = value

LABSTER_DEFAULT_LTI_ID = LABSTER_SETTINGS.get('LABSTER_DEFAULT_LTI_ID', 'MC')
LABSTER_API_URLS = {
    "coaches": "/labster/api/coaches/",
    "licenses": "/teacher/api/v0/licenses/",
    "simulations": "teacher/api/v0/licenses/{}/simulations/",
    "students": "teacher/api/v0/licenses/{}/simulations/{}/students/"

}
