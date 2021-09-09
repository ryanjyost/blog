---
title: "My responses to Courtland Allen's idea validation checklist"
date: "2020-03-10"
description: "Lately I've been trying to build my audience around npm dependencies."
---

⚠️ ✅ ❌

#### ✅

#### ⚠️

#### ✅ Do I know who my target customer is?

Admittedly I have a general group of "JavaScript developers" in mind with several more niche potentials, but if I had to
pick and really get specific, I'd say it's "JavaScript consultancies that manage many projects"

#### ✅ Is there a term that encapsulates my target customer (good), or do I have to string together a bunch of adjectives (not as good)?

"JavaScript dev teams" seems pretty good.

#### ✅ Am I my own target customer?

Yep!

#### ✅ Can I describe my target customer’s problems?

There's the general problem of taming the JavaScript ecosystem, specifically the npm package ecosystem, which is very
large, fast-evolving and source of potential bad practices, headaches, security vulnerabilities, etc.

#### ⚠️ Do I know how my customers describe their problems in their own words?

While I could certainly describe it and know how to have conversations about this problem, I have very little actual
quotes and explanations from target customers. So I need to get a bigger sample size of verbiage to tick this one off.

#### ✅️ How aware are customers that they even have this problem?

For experienced, organized JavaScript developers that care about the quality of their software, they are definitely
aware of the issues that arises from mismanaging npm dependencies.

#### ✅️ Do customers encounter this problem frequently?

Variations of the problem, yes. Vetting new deps isn't as common as using them within code, but devs interact with
dependencies on a daily basis and are constantly thinking about new tools, potential issues, etc.

#### ⚠️ How highly do customers value solving this problem? That is, how much money are they spending to solve this problem today?

For many teams, I imagine they just install the deps that work and will make their software better without
reinventing the wheel. So some teams just ignore the problem of strict dependency management altogether, but I know
my teams have spent countless hours migrating from a bad dependency or switching them or, or investigating XYZ
about existing deps.

#### ✅️ Do I know why customers find this problem valuable?

There are several reasons why dev teams value understanding their deps, monitoring them and managing them diligently...

- Avoiding security vulnerabilities
- Avoiding huge bundle sizes and bloating their code
- Avoiding using deps unnecessarily
- Saving the time and money that are often needed to remedy shitty dep situations

#### ✅️ How many potential customers are there?

A shit ton?

#### ✅️ Are the customers people I enjoy being around?

Absolutely!

#### ✅ Are there any early adopters among my target customers? Market / product fit

100% - devs are some of the most willing to try new, not-established products and services.

#### ⚠️ Does my solution do a good job solving my specific customers’ problem?

Solution is still up in the air. Possible initial solutions are....

- The current MVP, which just spits out a report of a JavaScript project's dependencies. Not great, but something.
- Current MVP, but emailed on a regular basis with only the notable items.
- GitHub integration where new dependencies in PRs are analyzed
- A whitelist of dependencies to be used by an organization, CI/CD, require explicit approval.

#### ⚠️ Is it clear how my solution solves the problem?

Again, still up in the air. But the general idea is that by diligently monitoring/gatekeeping npm dependencies, then
teams/devs will avoid issues and save time and money.

#### ❌️ Does my solution solve the specific valuable problem that customers have, or does it solve some vague hodgepodge of problems?

Current MVP solves a hodge podge of problems, but through more research I should be able to come up with a more
specific solution for the exact problem I land on.

#### ✅ Did I craft my solution by working backwards from what the customers’ problem is (good), or did I have a product idea and manipulate it to try to solve the customers’ problem (risky).

The MVP came from a former boss explicitly telling me about a problem of wanting to analyze client projects' npm
dependencies to find potential maintenance work. But then he never used it and I struggled to figure out if other
consultants had the same problem. But I haven't crafted more of a solution yet because I want to really understand
the problem first.

#### ✅ Will it be hard for potential customers to switch from other solutions to mine?

No, dont think so. Any of the potential solutions above would be simple to add to existing practices.

#### ✅ Will paying customers eventually graduate from my solution?

Mmmm, don't think so? There are legit solutions for automated pull requests and security vulnerability detection, but
this would be different.

#### ✅ Will paying customers use my solution frequently? (This isn’t necessarily the same thing as them encountering the problem frequently.)

Mmmm, if it's just informational then probably not. But if I can automate analysis and checks in a dev process, then
it will just work within existing practices, and get the dev involved only when there's an issue.

#### ✅ Are my customers savvy enough to understand and use my solution?

Definitely.

#### ⚠️ Will my customers be the ones in control of purchasing my solution?

If I target engineering managers or leads at consultancies, then probably. But devs don't make financial decisions
, they can just request their leads to purchase.

#### ⚠️ Will it be hard for paying customers to switch from my solution to others?

Well they could just switch mine off. But I'm not sure of other solutions like mine of whitelisting deps across teams?

#### ❌️ How excited are my potential customers about my solution?

Don't know! Need to refine the exact problem I'm solving, then come up with the ideal solution, then propose that
solution to potential customers and see what they say.

#### ⚠ Are multiple businesses already solving this problem for customers (good), or is it a winner-take-all market (bad), or is it an unsolved problem (risky)?

Well, many are automating the monitoring and remedying of dependency issues

[ ][ ] Can I build an MVP (or really an SLC) quickly?
[ ] Do I personally know how to do a good job building this solution?
[ ] Will my solution be unique and differentiated?
[ ] Will my solution remain unique, or are the unique things about it easy to copy?
[ ] From best to worst: Does my solution work automatically in the background (e.g. Stripe), is it part of an existing customer habit or workflow (e.g. Github), or does it require customers to remember to use it (e.g. books)?
[ ] Is the solution fun to use for its own sake, or is it a chore aka a necessary evil customers must use to get to what they really want? Be honest here. Product / channel fit
[ ] Does my solution naturally fit in with a promising distribution channel, or will I have to artificially do things on the side
[ ] Will my solution make customers feel awesome about themselves or give them something to brag about to others? (good for WoM distribution)
[ ] Does my solution get shared with others as part of default usage, e.g. greeting cards or websites or emails? (good for WoM distribution) Channels •
[ ] Can I name channels that can reach my target customer? (For example, 2 does my customer search Google for solutions to their problem, do they subscribe to newsletters, do they listen to the radio, do they hang out in Facebook groups, are they on Instagram, etc.)
[ ] How frequently does my target customer engage with these channels?
[ ] How much traffic do these channels get?
[ ] Is there a limit to the frequency with which I can make use of this channel?
[ ] Will it be hard to break into these channels? Is there a lot of competition or other barriers to entry in my way? Do I have any advantages for overcoming them?
[ ] Are there any brand new channels my customers use that I can get in on early before the competition? e.g. early days of Quora, Instagram ads, App Store, etc.
[ ] Are there individual people/companies who control my chosen distribution channels and might pull the plug on me?
[ ] Do I have a strong advantage in building up distribution channels I control myself? e.g. WoM growth, mailing lists, habitual direct usage, cold calls Channel / model fit
[ ] Is my pricing model high enough for me to profitably make use of my desired channel? e.g. You can’t afford to hire salespeople if you’re charging \$10/mo.
[ ] If my pricing model is low, then do my most desirable channels happen to be cheap things like viral WoM growth or SEO? Pricing model
[ ] Is the solution valuable enough for each customer pay a lot for it? (high ARPU)
[ ] Will it be obvious to customers how to measure the value of solving their problem, such that they won’t balk at my price? (For example, salespeople are easy for businesses to value.)
[ ] Is my price point high enough that I can do things that don’t scale and brute force my way to profitability (e.g. call 100 customers), or am I going to have to be clever enough to find a way to get thousands of paying customers before I hit profitability because my price point is so low?
[ ] Is there competition driving the price significantly below the value provided? 3 Model / channel fit
[ ] Are there enough customers in the market that my price point makes sense? (You have to charge more if there are fewer potential customers in the market.) Other stuff
[ ] Is my target market a small subset of a larger market that I can someday target?
[ ] Can I break this business down into a set of steps to get to my ultimate goal?
[ ] What do my trusted mentors think about this?
[ ] What are the most significant obstacles I’ll need to overcome?
[ ] Why hasn’t anyone else done this? If they have, how can I beat them? Do I even need to beat them?
[ ] Can this survive competent competition from well-funded startups? From open-source projects? From big players in related spaces, e.g. Google?
[ ] Will other talented people be excited to help out with this? Personal strengths and weaknesses
[ ] Is there a high risk of me writing a ton of unnecessary code for this? Ideally I can launch the MVP with no code whatsoever.
[ ] Can I utilize my unique visual design skills with this product?
[ ] Can I eventually utilize my web development skills with this product?
[ ] I have an audience in the startup/bootstrapper space. Will this appeal to them?
[ ] I know a lot about startups, community building, content marketing, and email. Will this build on top of my existing knowledge? Personal goals
[ ] Will this business be fun in the beginning when there are no users?
[ ] Will this business remain fun when things gets hard?
[ ] Will this business be fun once I’ve hired or outsourced the core bits?
[ ] Will I enjoy talking to others about this business? Will they enjoy hearing about it?
[ ] Can I bootstrap this business, or use limited funding, or do I need VCs?
[ ] Will this business consume my life, or can it be more relaxed?
[ ] Will this business give me a reason to meet with interesting/impressive people? 4
[ ] Will I be able to hire friends and family to help with various parts of the business?
[ ] Will I learn lots of valuable things in the course of running this business?
[ ] Assuming this gets huge, will its effect on the world be a mission I support?
[ ] Do my incentives running this business align with my customers incentives, or will I eventually feel pressure to start doing things they hate?
