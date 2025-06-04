{
    "name": "HR Attendance Kiosk Limit",
    "version": "1.1",
    "category": "Human Resources",
    "summary": "Limits Kiosk Mode Check-in and Check-out by time with Bulgarian voice feedback",
    "author": "Custom",
    "depends": ["hr_attendance"],
    "data": [
        "views/kiosk_assets.xml"
    ],
    "assets": {
        "web.assets_frontend": [
            "hr_attendance_kiosk_limit/static/src/js/kiosk_voice.js"
        ]
    },
    "installable": True,
    "application": False,
    "auto_install": False
}
