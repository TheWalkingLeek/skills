require 'net/ldap'

class LdapTools
  class << self
    def ldap_connection
      @@ldap_connection ||= connect_ldap
    end

    def authenticate(username, password)
      check_username(username)
      result = ldap_connection.bind_as(base: basename,
                                       filter: "uid=#{username}",
                                       password: password)

      result.present?
    end

    def exists?(username)
      check_username(username)
      filter = Net::LDAP::Filter.eq('uid', username)
      result = ldap_connection.search(base: basename,
                                      filter: filter)
      result.present?
    end

    private

    def connect_ldap
      Net::LDAP.new(base: basename,
                    host: hostname,
                    port: port,
                    encryption: :simple_tls)
    end

    def basename
      @@basename ||= ENV['LDAP_BASENAME']
    end

    def hostname
      @@hostname ||= ENV['LDAP_HOSTNAME']
    end

    def port
      @@port ||= ENV['LDAP_PORT'] || 636
    end

    def check_username(username)
      unless username =~ /^([a-zA-Z]|\d)+$/
        raise ActiveRecord::StatementInvalid, 'invalid username'
      end
    end
  end
end
