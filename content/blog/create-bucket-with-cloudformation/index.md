---
title: "Deploy React Apps to AWS: Part 3 - Create a Hosting S3 Bucket with CloudFormation"
date: "2019-11-29"
description: "Manually creating buckets sucks, so let's do it automatically with CloudFront templates."
---

Before going on with this tutorial, be sure you've got AWS CLI setup and you're comfortable with stuff already covered.

Here are the previous parts in this tutorial series.

1. [Setting up the AWS CLI](https://www.ryanjyost.com/setup-aws-cli/)
2. [Create an S3 Bucket and Host a React App Manually](https://www.ryanjyost.com/create-s3-bucket-manually/)

### What you'll do in this tutorial

In this tutorial, you're going to do what we did in [Part 2](https://www.ryanjyost.com/create-s3-bucket-manually/), but instead
of doing all of the S3 configuration and creation manually in the AWS
Console, you're going to run a single command that provisions the S3 Bucket
automatically. Of course, there's a configuration file (CloudFormation
template) you need for that command to do what we need it to do, but we'll get to that.

### Why care?

- If you're building single-page React apps (or any other type of static site
  ) on a regular basis, then you're going to need to create S3 Buckets. Doing
  that manually is annoying, time consuming and prone to human mistakes.

- Leveraging CloudFormation templates to determine how AWS resources are
  provisioned and configured will certainly save you time in the long-run, especially as your cloud architecture becomes more complex, e.g. a later part
  of this series will involve CloudFront distributions, staging environments, and custom domain names.

- And if you work with others on a project deployed on AWS, then a
  CloudFormation template will help document your deployment setup and make
  it trivial for anyone to redeploy the app.

- Treating buckets and other AWS resources as disposable is a helpful way to
  approach cloud hosting. Your apps can be taken down and deployed back to
  the cloud really quickly.

## Tutorial Time

### Create a React app to deploy

As you probably guessed, we'll quickly create an app with [create-react-app](https://github.com/facebook/create-react-app).

```dotenv
npx create-react-app deploy-bucket-example
cd deploy-bucket-example
npm start
```

If the setup worked, the app should open at [http://localhost:3000](http://localhost:3000)

### Create a CloudFormation Template

[CloudFormation Templates](https://aws.amazon.com/cloudformation/resources
/templates/) are "for the service or application architectures you want and have
AWS CloudFormation use those templates for quick and reliable provisioning of
the services or applications (called “stacks”)".

So, CloudFormation templates list and configure a _stack_ of resources that
can be
provisioned when that template is executed/run. These templates can be
written in `json` or `yaml`. We'll use `yaml`.

In the root of your project, create a [yaml](https://yaml.org/) file called
`cloudformation_basic.yml`.

```dotenv
> touch cloudformation_basic.yml
```

Paste the following stuff into it.

`gist:ryanjyost/12668f33f88bfc8a85b84d4f6d1e4617#cloudformation_basic.yml`

You can use the
[docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html)
and comments in the gist to get a feel what's going on, but let's quickly
walk through the main aspects of the file.

- `AWSTemplateFormatVersion` - a CloudFormation requirement. There's only one
  [format version](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html)
  so far so it's just a given for any template.
- `Parameters` -
  [optional parameters](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html)
  for your template, so you can customize the provisioned resources based on
  who's executing the template. In this example, everyone will need a
  unique `BucketName`, so that's a parameter that we'll pass through to the
  template via the CLI.
- `Resources` - the meat of a template, where
  [AWS resources are declared and configured](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
  for provisioning.
  - `MyBucket` is the bucket that will host your React app. The `MyBucket` is
    the name of the resource and can be anything, but it's nice to keep track
    of what resources are for what with specific names. Just one bucket here, so not
    an issue. Also, note that we need to reference `MyBucket` in other
    areas of the template.
  - `MyBucketPolicy` is the [policy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-policy.html) for `MyBucket`. The name of the resource
    `MyBucketPolicy` is arbitrary just like `MyBucket`. The bucket policy is
    configured to allow public access to our hosting bucket.
- `Outputs` - Not too important here, but here are the
  [docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html)

**Here's some notable syntax stuff in this template that are helpful in all
templates.**

- `!Ref` let's you
  [reference a resource that's declared within the same template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-ref.html).
- `!GetAtt` ["returns the value of an attribute from a resource in the
  template"](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)
- `!Join` ["makes it easy to combine text and references"](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-join.html)

### Provision a bucket with the CloudFormation Template

Now we'll actually execute our CloudFormation Template and create a static
website hosting S3 Bucket.

Add this command to the `scripts` in your `package.json`, but add a _unique_
bucket name rather than the placeholder.

```json
{
  ...

  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "provision": "aws cloudformation deploy --template-file ./cloudformation_basic.yml --stack-name hosting-bucket --parameter-overrides BucketName=<BUCKET_NAME>"
  },

  ...
}
```

**Here's a quick breakdown of the aspects of this command...**
- `cloudformation` is the AWS service we're using
- `deploy` is a CloudFormation action to execute a template and provision the resources specified. Check out ze [docs](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/deploy/index.html)
- `--template-file` specifies the template to execute
- `--stack-name` is an arbitrary name for your stack, which can be used to reference later in the AWS Console or if updating it
- `--parameter-overrides` is how you pass parameters defined at the top of the CloudFormation templates

Now execute the command to create the stack specified in the template.

```dotenv
> npm run provision
```

Once executed, you should see some output like the following.

```dotenv
Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - basic
```

### Verify everything in AWS Console

To see that the bucket was actually created, visit the AWS console and check that the bucket is in your list of S3 Buckets.

Also, find the CloudFormation section of your AWS Console. The main page of that lists your stacks, where you should see the "basic" stack. You can click through to the details of the stack you just executed by running the `provision` script.

![Image](https://yosts-posts.s3.amazonaws.com/post3_cloudformation.png)

### Upload the React app to your bucket
Add another script called `upload`, again replacing the `<BUCKET_NAME>` with the one you added to the `provision` script.

The app needs to be built for production before it can be uploaded to your bucket, so add a script that both builds _then_ uploads your app, called `deploy`.

```json

{
  ...

  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "provision": "aws cloudformation deploy --template-file ./cloudformation_basic.yml --stack-name hosting-bucket --parameter-overrides BucketName=<BUCKET_NAME>",
    // new scripts below
    "upload": "aws s3 sync build/ s3://<BUCKET_NAME> --delete",
    "deploy": "npm run build && npm run upload"
  },

  ...
}
```


Now you can deploy your app to your S3 bucket by running the below command.
```dotenv
npm run deploy
```

Now you can visit your bucket's endpoint (find at AWS Console > S3 > Bucket > Properties > Static Website Hosting > Endpoint) and see the app there!

## And that's it!

You can now host a React app in an S3 bucket and deploy it via the CLI. But that's just the tip of the iceberg!

**Stay tuned for future installments of the series that will cover topics such as...**

- distributing an S3 website via CloudFront (CDN)
- custom domains
- production and staging deployments
- automated provisioning with CloudFront
- CI/CD integration (CircleCI)

If you want to see a single app with all of those topics implemented, **check out [react-spa-starter](https://github.com/ryanjyost/react-spa-starter), an open source React/Redux boilerplate** I'm working on that inspired this
tutorial series.

