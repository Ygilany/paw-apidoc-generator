# Paw Generator for ApiDoc
[![Build Status](https://travis-ci.org/Ygilany/paw-apidoc-generator.svg?branch=master)](https://travis-ci.org/Ygilany/paw-apidoc-generator)
[![Coverage Status](https://coveralls.io/repos/github/Ygilany/paw-apidoc-generator/badge.svg?branch=master)](https://coveralls.io/github/Ygilany/paw-apidoc-generator?branch=master)
[![Code Climate](https://codeclimate.com/github/Ygilany/paw-apidoc-generator/badges/gpa.svg)](https://codeclimate.com/github/Ygilany/paw-apidoc-generator)
[![Issue Count](https://codeclimate.com/github/Ygilany/paw-apidoc-generator/badges/issue_count.svg)](https://codeclimate.com/github/Ygilany/paw-apidoc-generator)
[![License](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/Ygilany/paw-apidoc-generator/blob/master/LICENSE.md)

 generates the inline documenation for the RESTful APIs.

# Installation
Clone this git repo into your extensions folder as `com.ygilany.PawExtensions.apiDocGenerator`.

# Change Log
### v 1.2.0
#### I appologize to all users of this extenstions for not mainitaint it. I didn't realize anyone was using it until very soon. Also all PRs are welcome
- uses get-data-type npm module instead of parsing the datatype myself.
- update the handlebars template to include the curly brackets surrounding the data types and the method
- generate the docs for the response only when the response status code is 200. (instead of previously depending on a property called status having the value `SUCCESS`)
- generate apiName based on concatenation of the requestName
- present the first letter of the datatypes in upper case format
- replaced `var`s with `const`s

### v 1.1.0 (in development)
- parsing the API Version, permissions and name from the description if the description was parsable, otherwise, keep as is.

### v 1.0.0
- The core functionality of the extension.
