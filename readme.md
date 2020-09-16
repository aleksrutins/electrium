# Electrium
## Like [Wavebox](https://wavebox.io), but free.
### Installation
Run `$ yarn dist`. The installer/AppImage should be in the `dist` directory.

### Configuration
`$HOME/electrium.toml` has the configuration. Here is the default:
```toml
[[apps]]
name = "Welcome"
url = "welcome.html"
img = "welcome.svg"
default = true

# Add apps here
# Example (Slack web app):
# [[apps]]
# name = "Slack"
# url = "https://app.slack.com/client"
# img = "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png"

[[apps]]
name = "Add App"
url = "login.html"
img = "add.svg"
```
See <https://toml.io> for documentation on TOML. \
To add an app, you can use the '+' view in the app to give you TOML code. The benefit of using that is that it can auto-detect icons on sites that are standards-compliant. When it shows you the TOML code, paste it between the "Welcome" entry and the "Add App" entry in the `# Add apps here` section. The example is for the Slack web app.