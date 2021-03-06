# Puzzle Skills

[![Build Status](https://travis-ci.org/puzzle/skills.svg)](https://travis-ci.org/puzzle/skills)

## Back-End

Das Back-End ist umgesetzt mit Ruby on Rails mit einer API Schnittstelle.

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [RVM](http://rvm.io/)
* PostgreSQL

### Development

* `git clone https://github.com/puzzle/skills.git`
* `cd skills`
* `rvm install 2.3`
* `rvm use 2.3`
* `gem install bundler`
* `sudo apt-get install libpq-dev`
* `bundle`

#### database setup

* `sudo apt-get install postgresql postgresql-contrib`
* `sudo su - postgres`
* `createuser puzzlecv -s -l -P` (with password puzzlecv)
* type `exit`

go back to skills repo
* `rails db:setup`

now run backend server
* `rails s`

#### Testing

* To run the backend tests run `rake spec`
* Frontend tests can be executed with `rake spec:frontend`
* Frontend tests with livereload `rake spec:frontend:serve`
* To run a single test run the following command in the frontend folder `npm test --filter "some filter words"`
* There is also `rake ci` and `rake ci:nightly` which should be periodically exectued by a build job (e.g. on jenkins)

#### Definition of Done (DoD) for new Code / Features

* implementation (inclusive correspondent frontend and backend tests)
* `rake spec` passes
* `rake spec:frontend` passes
* `rake rubocop` passes
* manual testing (start server, frontend and click through the new feature)
* peer review
* remove obsolete code

### LDAP config

The following environment variables are required for using ldap:

| Umgebungsvariable | Beschreibung | Default |
| --- | --- | --- |
| LDAP_BASENAME | LDAP Base name, e.g. ou=users,dc=yourdomain,dc=com  | - |
| LDAP_HOSTNAME | LDAP Server host name | - |
| LDAP_PORT | LDAP Server Port | 686 |

### Enable Authentication in development

Set the Environment variable ENABLE_AUTH to true in backend.

## Front-End

Das Front-End ist umgesetzt mit EmberJS.

see frontend/README.md
