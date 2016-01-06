"""
Registers Teacher Dashboard for the edX platform.
"""

from django.utils.translation import ugettext_noop
from xmodule.tabs import CourseTab


class TeacherDashboardTab(CourseTab):
    """
    The representation of the Teacher Dashboard
    """

    type = "teacher_dashboard"
    title = ugettext_noop("Teacher Dashboard")
    view_name = "dashboard_view_handler"
    is_dynamic = True

    @classmethod
    def is_enabled(cls, course, user=None):
        return True
