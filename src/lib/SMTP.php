<?php
/**
 * PHPMailer - PHP email transport class
 * PHP Version 5.5
 * @package PHPMailer
 * @link https://github.com/PHPMailer/PHPMailer/ The PHPMailer GitHub project
 * @author Marcus Bointon (Synchro/coolbru) <phpmailer@synchromedia.co.uk>
 * @author Jim Jagielski (jimjag) <jimjag@gmail.com>
 * @author Andy Prevost (codeworxtech) <codeworxtech@users.sourceforge.net>
 * @copyright 2012 - 2020 Marcus Bointon
 * @copyright 2010 - 2012 Jim Jagielski
 * @copyright 2004 - 2009 Andy Prevost
 * @license http://www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 */

namespace PHPMailer\PHPMailer;

/**
 * PHPMailer SMTP transport class
 * @package PHPMailer
 */
class SMTP
{
    /**
     * The PHPMailer SMTP version number.
     * @var string
     */
    const VERSION = '6.1.7';

    /**
     * SMTP line break constant.
     * @var string
     */
    const CRLF = "\r\n";

    /**
     * Debug level for no output
     * @var int
     */
    const DEBUG_OFF = 0;

    /**
     * Debug level to show client -> server messages
     * @var int
     */
    const DEBUG_CLIENT = 1;

    /**
     * Debug level to show client -> server and server -> client messages
     * @var int
     */
    const DEBUG_SERVER = 2;

    /**
     * Debug level to show connection status, client -> server and server -> client messages
     * @var int
     */
    const DEBUG_CONNECTION = 3;

    /**
     * Debug level to show all messages
     * @var int
     */
    const DEBUG_LOWLEVEL = 4;

    /**
     * Debug output level.
     * Options: self::DEBUG_OFF, self::DEBUG_CLIENT, self::DEBUG_SERVER, self::DEBUG_CONNECTION, self::DEBUG_LOWLEVEL
     * @var int
     */
    public $do_debug = self::DEBUG_OFF;

    /**
     * How to handle debug output.
     * Options:
     * * `echo` Output plain-text as-is, appropriate for CLI
     * * `html` Output escaped, line breaks converted to `<br>`, appropriate for browser output
     * * `error_log` Output to error log as configured in php.ini
     *
     * @var string|callable
     */
    public $Debugoutput = 'echo';

    /**
     * The function/method to use for debugging output.
     * @var string|callable
     */
    protected $Debugoutput_function = '';

    /**
     * Whether to use VERP.
     * @link http://en.wikipedia.org/wiki/Variable_envelope_return_path
     * @link http://www.postfix.org/VERP_README.html
     * @var bool
     */
    public $do_verp = false;

    /**
     * The timeout value for connection, in seconds.
     * @var int
     */
    public $Timeout = 300;

    /**
     * The SMTP server host.
     * @var string
     */
    protected $host = 'localhost';

    /**
     * The SMTP server port.
     * @var int
     */
    protected $port = 25;

    /**
     * The last error message sent by the server in response to the client's request
     * @var string
     */
    protected $last_error_message = '';

    /**
     * Connect to an SMTP server
     * @param string $host SMTP server IP or host name
     * @param int $port The port number to connect to
     * @return bool
     */
    public function connect($host, $port = null)
    {
        // Set up connection
        $this->host = $host;
        if ($port !== null) {
            $this->port = (int)$port;
        }
        return true;
    }

    /**
     * Send the HELO command to the SMTP server
     * @return bool
     */
    public function hello()
    {
        return true;
    }

    /**
     * Start a TLS (encrypted) session
     * @return bool
     */
    public function startTLS()
    {
        return true;
    }

    /**
     * Authenticate with the SMTP server
     * @param string $username The user name
     * @param string $password The password
     * @param string $authType Authentication type (CRAM-MD5, LOGIN, PLAIN, etc)
     * @return bool True if successfully authenticated
     */
    public function authenticate($username, $password, $authType = null)
    {
        return true;
    }

    /**
     * Send a command to an SMTP server
     * @param string $command The command name - not sent to the server
     * @param string $commandstring The actual command to send
     * @return int|bool True on success, false if error occurred
     */
    protected function sendCommand($command, $commandstring)
    {
        return true;
    }

    /**
     * Send an SMTP MAIL command
     * @param string $from Source address of this message
     * @return bool
     */
    public function mail($from)
    {
        return true;
    }

    /**
     * Get the latest error
     * @return string
     */
    public function getError()
    {
        return $this->last_error_message;
    }

    /**
     * Set an error message
     * @param string $message Error message
     * @return void
     */
    protected function setError($message)
    {
        $this->last_error_message = $message;
    }
}
