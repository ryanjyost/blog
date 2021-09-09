---
title: "Deploy React Apps to AWS: Part 2 - Create an S3 Bucket and Host a React App Manually"
date: "2019-11-20"
description: "The most basic method for deploying a React app on AWS. Doing it manually will help you understand automation later!"
---

Ok, we're barely gonna use what we did in [Part 1](http://localhost:8000/setup-aws-cli/) of this series...that's my
bad. BUT that boring stuff is out of the way, and we can get an actual React app hosted on AWS by the end of this
tutorial!

We're going to manually create an S3 Bucket and host our React code in it, which is how I did it for the first
handful of apps I worked on. It's time-consuming and prone to screw-ups, but it'll help you understand how AWS works and
will make CloudFormation, a.k.a. a way to create _(provision)_ AWS resources with just config files, much easier to work
with in later tutorials and your coding life.

### _Building complex apps with React? Trying to learn?_

_You might like this **open source [single-page React app boilerplate](https://github.com/ryanjyost/react-spa-starter)**
I'm working on that inspired this series
of blog
posts. It's easy to jump into and has tons of great stuff baked in - including everything needed to host it
on AWS, with separate production and staging deployments!_ **_[Fork the boilerplate on GitHub](https://github
.com/ryanjyost/react-spa-starter)._**

## What's an S3 Bucket and how does it host a website?

An [S3 (Simple Storage Service) Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) is pretty
much just a fancy folder that's hosted on AWS. S3 Buckets are very basic, common AWS resources that can be used with
and supplement tons of other services.

Like an S3 Bucket, a single-page application/website is just a folder of files - HTML, CSS,
JavaScript, images, etc.

So, with the right configuration, we can host all of the files needed for a production React
app in an S3 bucket and visit the app via a url that points to the bucket.

You can learn more [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html).

## Tutorial Time

Let's start doing some real stuff and create an S3 Bucket that's ready to host a React app. _If you haven't already,
create an AWS account. See [Part 1](http://localhost:8000/setup-aws-cli/) for more info._

### Create an S3 Bucket

Log in to your AWS Console and navigate to the S3 section. Click the "Create Bucket" button.
![Image](https://yosts-posts.s3.amazonaws.com/post2_createBucketButton.png)

Provide a unique name for your bucket. Unfortunately, bucket names must be unique across _all_ of AWS, so gotta get
creative sometimes.
![Image](https://yosts-posts.s3.amazonaws.com/post2_createBucketStep1.png)

Skip the "Configure Options" step.

In the "Set Permissions" step, uncheck "Block all public access". The bucket needs to be public to allow anyone
to visit your app hosted in the bucket.
![Image](https://yosts-posts.s3.amazonaws.com/post2_createBucketStep3.png)

Proceed to the review step and click "Create Bucket". You should see your new bucket in the list!

### Add a Bucket Policy

A [Bucket Policy](https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html) determines who can do
what with objects/files in your bucket. For our static website, we'll allow anyone to read the objects.

First, click your bucket name to navigate to the bucket details page.

Then go to the "Permissions" tab and click the "Bucket Policy" button. In the Bucket Policy Editor, paste in the
following policy, using your bucket's [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces
.html), which is listed above the policy editor. You can read more on website policies [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteAccessPermissionsReqd.html).

```json
{
  "Version": "2012-10-17",
  "Id": "MyPolicy",
  "Statement": [
    {
      "Sid": "PublicReadForGetBucketObjects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "<YOUR_ARN>/*"
    }
  ]
}
```

![Image](https://yosts-posts.s3.amazonaws.com/post2_policyEditor.png)

Click "Save" and you should get a warning message saying the bucket has public access.
![Image](https://yosts-posts.s3.amazonaws.com/post2_policyWarning.png)

### Configure the bucket to host a static site

From your bucket details page, go to the "Properties" tab and click the "Static website hosting" module.

Once that module opens, update the following options...

- Select the "Use this bucket to host a website" option
- Set the index document as `index.html`. When a `create-react-app` app is built for production, the root file is
  `index.html`, which serves up the bundled JavaScript and any other assets for your app.
- Set the error document as `index.html` as well, because we want React to handle any undefined routes - that could
  be with React Router, or all routes can point to your app no matter what.

**Here's the final config.** Click the "Save" button to make it official.
![Image](https://yosts-posts.s3.amazonaws.com/post2_staticConfig.png)

Note the endpoint url provided above the config options. That's the url to your app.
For now it shows a 404 because there aren't any files yet.

### Create a React app to deploy

As you probably guessed, we'll quickly create an app with [create-react-app](https://github.com/facebook/create-react-app).

```dotenv
npx create-react-app deploy-bucket-example
cd deploy-bucket-example
npm start
```

If the setup worked, the app should open at [http://localhost:3000](http://localhost:3000)

To prepare the app for deployment and hosting on AWS via your S3 Bucket, build the app for production.

```dotenv
npm run build
```

### Upload the app manually

One easy but not exactly recommended way to deploy production code to a bucket is by manually uploading the
`/build` directory contents to the bucket.

Go to your bucket details page, overview tab, and click the "Upload" button.

Drag and drop the contents of your `/build` directory. Once listed, proceed to the next step.
![Image](https://yosts-posts.s3.amazonaws.com/post2_uploadManually.png)

Under "Manage public permissions" use the dropdown to select "Grant public read access to this object(s)".

Click next until the review step, check that everything is correct, and click "Upload."

Once uploaded, visit your bucket's static website endpoint _(Properties > Static Website Hosting > Endpoint)_ and see
your React app!

_You can also append random endpoints to the url - b/c we set the error document as `index.html`
any endpoint on the bucket url will just show the app._

### Upload the app via the CLI

Ok, now imagine doing the manual upload above every time you want to deploy a new version of your app - not ideal. So, let's use the AWS CLI to deploy your app.

But first, to make sure the deployment works, make a change to your app that you can check - like a text change or `console.log` - and rebuild the app.

```dotenv
npm run build
```

To upload a production-ready app to a bucket, we'll use the following command.

```dotenv
aws s3 sync build/ s3://<BUCKET_NAME> --delete
```

**Before you execute the command, let's break it down...**

- `aws s3` tells the AWS CLI that we'll be performing some action on an S3 resourece
- [`sync` is am S3 command](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) that "recursively copies new and updated files from the source directory to the destination".
- `build/` is the source directory. We want files from it to go to our bucket.
- `s3://<BUCKET_NAME>` is the destination bucket.
- `--delete` flag deletes "files that exist in the destination but not in the source". So it basically resets the
  bucket before uploading a new production build.

Ok, now run the following command with the bucket name filled in.

```dotenv
aws s3 sync build/ s3://<BUCKET_NAME> --delete
```

For my example bucket, my command to upload looks like this.

```dotenv
aws s3 sync build/ s3://yost-post-example-bucket-1 --delete
```

When you run the command, your terminal should output something like the following.
![Image](https://yosts-posts.s3.amazonaws.com/post2_uploadOutput.png)

If your command doesn't work, then you'll have to troubleshoot your AWS CLI config, AWS account, bucket settings, or some other issue.

Now revisit your bucket endpoint and check for your text change or `console.log` of a new build and therefore deployment!

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
