# SYNOPSIS
This is a CLI (command line interface) for [The Email Language](https://github.com/mattmezza/email-lang).

# BUILD

[![Travis](https://img.shields.io/travis/mattmezza/email-lang-cli.svg)]()

# USAGE

### Installation

```bash
npm install -g email-lang-cli
```

### Input
Write an email file that follows the language specification

```
From: "matteomerola.me" <mattmezza@gmail.com>
Subject: Comment about the novel
Date: February 21, 2017 at 7:02:47 AM GMT+1
To: Tiffany <tiffany.holsen@me.com>
Reply-To: Matteo <mattmezza@gmail.com>

We all know the numerous film adaptations of the novel!

Cheers,
  Matt.
```

### Use the CLI

Use [email-lang-cli](https://github.com/mattmezza/email-lang-cli) to parse the file and produce a json output.

```bash
email-lang-cli --file email.txt --out-file emails.json
```

The full specification of the CLI can be obtained with `email-lang-cli -h` and is as follows

```
Usage: email-lang-cli [options] [command]

Commands:

  help  Display help

Options:

  -d, --dir [value]       The directory containing the email text files you want to parse (defaults to "emails-directory")
  -f, --file [value]      The file containing the email text you want to parse (defaults to "email.txt")
  -h, --help              Output usage information
  -o, --out-file [value]  The output file in which you want the emails to be parsed (defaults to "emails.json")
  -v, --version           Output the version number
```

`--file`: takes a file in input. The file might contain one or more emails in the classic text format
`--dir`: takes a directory in input. The directory contains all the email files to parse (by default it ignores file names not ending with `.txt`)
`--out-file`: specifies the file name of the output json file

Typical usage would be:

`email-lang-cli -f email.txt -o emails.json`

This would print out some info and create the output file starting from the input file

### Output

The result will be an array of emails structured as follows

```json
[
  {
    "from": {
      "name": "matteomerola.me",
      "email": "mattmezza@gmail.com"
    },
    "subject": "Hello from Ibiza",
    "date": "February 21, 2017 at 7:02:47 AM GMT+1",
    "to": {
      "name": "Tiffany",
      "email": "tiffany.holsen@me.com"
    },
    "replyTo": {
      "name": "Matteo",
      "email": "mattmezza@gmail.com"
    },
    "text": "We all know the numerous film adaptations of the novel!\n\nCheers,\n  Matt.\n"
  }
]
```

# LICENSE

http://matteomerola.me

[![License](https://img.shields.io/npm/l/array.from.svg)](/LICENSE)
