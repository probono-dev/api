# Contributing to ProBono <!-- omit in toc -->

First of all, hey, and welcome to the **ProBono Contribution Guide** 🚀📣!

We're very happy that you've stumbled upon this project and would like to contribute. Every little helps. Let's make the world into a better place together! 🌍

- [I have a question about the project](#i-have-a-question-about-the-project)
- [Code of Conduct](#code-of-conduct)
- [Before Your First Issue](#before-your-first-issue)
  - [I have an idea for ProBono](#i-have-an-idea-for-probono)
  - [I have an API / integration idea](#i-have-an-api--integration-idea)
  - [I want to help you develop some feature](#i-want-to-help-you-develop-some-feature)
  - [I've found a bug / issue](#ive-found-a-bug--issue)
  - [I'd like to contribute in another way](#id-like-to-contribute-in-another-way)
    - [Partner your company with us](#partner-your-company-with-us)
    - [Donations](#donations)
- [Your first contribution](#your-first-contribution)
  - [Create a great first issue](#create-a-great-first-issue)
  - [Create an awesome first pull request](#create-an-awesome-first-pull-request)
  - [Be part of the team](#be-part-of-the-team)
  - [Create your first code review](#create-your-first-code-review)
- [Coding Style](#coding-style)
  - [TypeScript Styles](#typescript-styles)
  - [Usage](#usage)
    - [End of line](#end-of-line)
    - [Semi Quotes](#semi-quotes)
    - [Single Quote](#single-quote)
    - [Tabs vs Spaces](#tabs-vs-spaces)
    - [Trailing commas](#trailing-commas)
    - [Ordered imports, Object literals keys, etc](#ordered-imports-object-literals-keys-etc)
- [Commit Style](#commit-style)

## I have a question about the project

I'm glad you're interested! Please - however - do not use the GitHub Issues page for question regarding the project. Instead, [join us on Slack, by clicking this link](https://join.slack.com/t/probono-dev/shared_invite/enQtNjMwMDY0ODQ4Mzg5LWUwZTFlZjkwYmM5NDkyOTZkZmFiOTVhMDkwNmY4NzFjNTMyOWY4OTZkZTY1ZmIwNmM0N2ZlMjQ1NzgwNjU2MGQ)!

## Code of Conduct

This project has an Official Code of Conduct, which explains behaviour expected of contributors. You can [read it all by clicking this link](CODE_OF_CONDUCT.md).

## Before Your First Issue

ProBono aims to be a project that helps organisations and developers alike, by bringing them together, creating a community of like-minded individuals, who want to make an impact on the World around us, while being productive and developing beautiful and useful projects. We can do this together, by following the same goals, trying to help each other.

Let's see if you fall under one of the below categories:

### I have an idea for ProBono

Great! There is a [repository called Roadmap](/probono-dev/roadmap) where you should see if someone else already suggested that, by searching the issues, or check out the actual roadmap. It might already include your idea in some form. You can still make suggestions, but use that as a reference point.

### I have an API / integration idea

Still, please use the Roadmap for all ideas.

### I want to help you develop some feature

Cool. The project is split into two parts at the moment. [The back-end is in the API repository](/probono-dev/api) and the [front-end resides in the Web repository](/probono-dev/web). There are GitHub projects set up for both of them and the Backlog lane represents on the Kanban Board the issues that can be tackled in the near future. After you read this, you should head over there and check out what active tickets we have at the moment. Once you do, jump over to 

### I've found a bug / issue

If you know what parts of the application it affects, e.g.: front-end (web) or back-end (API) or blog, please create an issue in the affected repository. There are issue templates that will help you create a very useful issue, that is easy for your peers to parse and ensures your contribution will be valid.

Make sure that you explain the nature of the issue you've found as well as steps to reproduce. Before you start working on an issue you've found, please read the whole guide.

### I'd like to contribute in another way

No matter what time or skill constrains you have, you can always help us. If your views align with this project, please take the time to share it on social media and tell your friends or collegues about it. A little exposure can go a long way.

#### Partner your company with us

If you feel like your company can provide us with something of value, e.g.: tools or services or dedicated development time, contact me at [kovacsemod@gmail.com](mailto:kovacsemod@gmail.com).

#### Donations

This is a non-profit initiative and therefore all donations will be turned to bettering this project without exceptions. This includes everything from running costs, to potential hired work needing to be paid for. The goal of this project is to be self-sustaining, but I understand it won't be for a long time. Every little helps.

Here are two ways you can donate to ProBono:

[![Donate via LiberaPay](http://img.shields.io/liberapay/goal/ProBono.svg?logo=liberapay "Donate via LiberaPay")](https://liberapay.com/ProBono/donate)

or donate [directly to Monzo at this link](https://monzo.me/danielkovacs8).

## Your first contribution

Before you create a new issue on GitHub, make sure you read this guideline and understand what types of issues should be submitted, where and in what format. If you know the answer to all three of those, only then should you submit a new issue. This is important, because it helps keep the project clean. As an open source project it is not possible to moderate who has access to code and similarly who can submit issues, but what we can do is make sure that everyone has a chance to contribute in a meaningful way.

### Create a great first issue

There are two types of issues that are accepted into the working repositories. The working repositories include [web repository](https://github.com/probono-dev/web), [api repository](https://github.com/probono-dev/api) and [blog repository](https://github.com/probono-dev/blog). The repository reserved for planning is [the roadmap repository](https://github.com/probono-dev/roadmap). If you're not sure that something is a bug or a new feature, please use the roadmap repository also.

There are templates for both of the issue types that are available for creation. If your issue doesn't fit within the frame of an issue template and you're not submitting it to the roadmap repository, then it means you should submit it to the roadmap repository. The types of issues you can submit to working repositories are `bug` and `feature`, however your first issue will not be a `feature` issue.

> Feature requests should only be opened by ProBono team members. This is to ensure that the tickets that include requests for new features are properly explained and are technically feasible as well as good fit for the project.

When you create a bug ticket, follow this process:

1. Make sure you can reproduce this bug on the latest version of the software. To do so, you need to make sure that your browser has the latest assets. The easiest way is to open your browser incognito mode and try to reproduce the problem. This is to make sure all the assets are up to date, i.e.: not cached by a service worker.
2. Go to GitHub and to the repository that you feel the bug is related to. Navigate to issues section and press on **New issue** button.
3. Select the **Bug Template** and fill out all the sections.
4. If you know the appropriate labels for your issue, you can add those too.
5. Join in the conversation as your issue gets processed.

### Create an awesome first pull request

Please do not create pull requests before an issue is assigned to you. Pull requests without an associated issue will not be accepted. The exception is from bots, like Greenkeeper. If you're a bot and reading this, just disregard the previous sentence, beep boop 🤖.

> Always create branches in your own fork and name them: `issue-type/short-description-[optional ticket number]`.

First, fork the project you want to contribute to. Once you pull it, read the project `README`, which will include instructions to start it on your local machine. Be aware that not all machines may be able to run the project, but I try my best. Some projects require more setup than others and you will need some external dependencies, such as `Node JS`.

Make sure your code adheres to [the coding style guide](#coding-style). Using a linter can make sure your commits are clean of linter errors. Linter will run on CI before a PR is merged and your pull request will be deployed to a staging server. Tests are also ran, to make sure nothing old breaks and everything new works as expected.

There are three types of tests:

- Unit tests are created to test your code itself to see if isolated pieces of logic are working correctly, as intended.
- Integration tests are useful for testing the surface of the feature
- End to end (e2e) tests are designed to simulate real-world interactions on a working product

An example of this these different types of tests on the same feature may look like this:

We create a login form. There should be an e-mail and a password field, both of which need to be validated. We have the back-end (API) working, all we need is to implement the UI in `React`.

To test the validation logic, we take advantage of unit tests, like so:

```ts
describe(`<LoginForm/> validation logic test example`, () => {
    const shouldFail: User[] = [
        {
            email: 'shouldFail',
            password: ''
        },
        ...restOfTestData,
    ];

    shouldFail.forEach(data => {
        it(`should fail with the following ${JSON.stringify(data)}`, () => {
            expect(validate(data)).toThrow('invalid email or password');
        });
    });
});
```

An integration test tests if the component works as a whole:


```ts
describe(`<LoginForm/> integration test example`, () => {
    // You would normally separate some of these tests into different blocks
    const testUser = {
        email: 'test@value.com',
        password: 'example-password',
    };

    const onLogin = sinon.spy();
    const wrapper = shallow(<LoginForm onLogin={onLogin} />);

    expect(wrapper.find(EmailInput)).to.have.lengthOf(1);
    expect(wrapper.find(PasswordInput)).to.have.lengthOf(1);

    wrapper.find('input[data-test-id=email]').simulate('change', { target: { value: testUser.email } });
    wrapper.find('input[data-test-id=password]').simulate('change', { target: { value: testUser.password } });

    wrapper.find('button').simulate('click');

    assert(onLogin.calledWith(testUser));
});
```

Finally when running end to end tests, all the conditions of a complete and running application should be provided. API and Web app should be both running for E2E tests. We use `Cypress` for end to end tests. In `React` apps E2E tests should be ran in test `NODE_ENV` so that `data-test-id` properties stay on them. These should be used to identify necessary components for testing.

Once you've submitted your pull request, wait patiently for CI and other checks to run. You must always submit pull requests to development branch, which is also the default branch. Depending on the nature of the issue it may be released to `staging` or straight to `master`. Releases to production happen automatically from the `master` branch.

Your pull request requires at least the approval of a team member and also for all checks to pass before merging. We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/). Please read about them. In most cases commits are squashed, so do not worry about the frequency of your commits. Release notes are created from commit messages, so be descriptive. Also add descriptions to make reviews easier for others.

### Be part of the team

If we like the work you do, you'll be invited to the team. There is a Core Team of the most involved contributors who know most about the project and there will be other teams, based on time zones and expertise. You can join the Slack channel and discuss team stuff with the others. You can also review other people's code and help them get it merged.

### Create your first code review

Before you create a review, make sure you know about [our coding style](#coding-style) and [commit style](#commit-style). 

## Coding Style

The style guidelines and best practices for our engineering team. We use Prettier for formatting and TSLint for linting.

### TypeScript Styles

TLDR

---

- **2 spaces** – for indentation
- **No unused variables** – this one catches tons of bugs!
- **Semicolons** – makes code more readable and is satisfying to hit `;` after you complete a statement
- **Space after keywords** `if (condition)` and `function (param)` but `function name(param)`.
- Try to use `===` instead of `==`
- **Always use dangling commas** for reasons explained below.
- Single `'` instead of `"` and ``string${variable}`` instead of `'string' + variable`

### Usage

---

    yarn add -D tslint tslint-plugin-prettier prettier

This will install necessary dependencies. Next, create the following two files. First, create a `tslint.json`, which will be the place for our linter config.

```json
{
    "defaultSeverity": "error",
    "extends": ["tslint:latest", "tslint-config-prettier"],
    "rules": {
        "ordered-imports": false,
        "object-literal-sort-keys": false,
        "interface-name": false,
        "no-submodule-imports": [true, "<exceptions>"],
        "no-unused-variable": true
    }
}
```

Where `<exceptions>` is where you can put a list of modules that export submodules and that behaviour is defined in their APIs.

Next you need to add the `.prettierrc`, which will set up Prettier. Its contents should be as follows:

```json
{
    "endOfLine": "lf",
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all"
}
```

To explain some of these choices:

#### End of line

We should use `lf` as line ending symbol, because that is standard on Linux and Mac. Our code will run on Linux, Git servers are on Linux, so it makes a lot more sense to commit with these line endings. R.I.P. Windows users.

#### Semi Quotes

This is JavaScript/TypeScript, not Python. In my opinion it is a lot more expressive to just use semi colons. The formatter adds these automatically, if you don't like to type them, but there should be no reason not to include them to terminate each statement.

#### Single Quote

To denote strings, a single quote sign or backtick sign should be used. Backtick sign should be used when interpolating strings or to format multiline strings better, as well as tagged template literals. Single quotes look cleaner than double quotes and make the text between them more distinctive and readable.

#### Tabs vs Spaces

On any real text editor if the formatting is set to use spaces it will do so when pressing the tab key, if you prefer to use it that way, if it's set to tabs however - you usually can't just press spaces anyway and hope for it to convert to a tab. Therefore I think it's more compatible with developers to use spaces. It also makes code look consistent across devices, when sharing code and when viewing diffs.

#### Trailing commas

This is almost as highly debated as tabs vs spaces. My main point for this is that when viewing line-by-line diffs on Git, you'll see a clear one line difference when adding or deleting lines from argument lists, object key value pairs or arrays.

If you need another reason, think of code generation and how much easier it is to be able to generate code line by line, without needing to have to think about last members.

Thirdly, it is more consistent and therefore more readable.

#### Ordered imports, Object literals keys, etc

In my opinion, imports should be grouped into two sections: dependencies and package imports, the latter being lower down in the list, separated by an empty line.

Object keys should come in order of importance and not in alphabetical order.

## Commit Style

We use [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) style for the commits on this project.

The ProBono Change Log gets generated from commit messages and the commit bot does not let non-conventional commit messages through.
