_Question 1_: Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:

Records Indexing I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."

Cheers, George

--

Hi George,

No worries, I am here to help.

1. Records are essentially your documents. Any item you're trying to search can be thought of as a record. If you deal with products then you can also think of a single product as a record.
2. Indexing is the act of bringing in your data into the index. An index is just storage mechanism search engines use to hold the data allowing for efficient search. Depending on where your data comes from and how large your data is, indexing will vary in speed and complexity.
3. For custom ranking, fields that you find to be most important / crucial should be included in the custom ranking. An example would be, an E-Commerce company might want to show customers higher rated items above those with lesser ratings. Other metrics can include things like "most purchased items" or "items added to cart" etc.

Hope I was able to answer your questions. Let me know if there is anything else I can help with.

Thanks,

Elias

_Question 2_: Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards, Matt

--

Hi Matt,

Very sorry to hear that you're having a hard time using the new Dashboard. I will pass along your notes to the dashboard engineers and see if it is something they can possibly address in the future. For now if you are needing to clear and delete indexes in iteration, it is possible to use the api which would allow you to clear and delete many indexes in a script. This might make it more effecient, however I understand that would require custom work. If this is an approach you would be interested in but don't have the resources to implement, I can try and build a script that would help you accomplish this.

Thanks,

Elias

_Question 3_: Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards, Leo

--

Hi Leo,

Glad to hear that you're thinking of intergrating Algolia in your website. As for as development work, we have a lot of example code available to look at which could help get started in implementing search on the site itself. You will first need to setup an Algolia Application with an index. This relativly simple and documentation is available to help. After setting up an index you will need to index your sites documents using one of the many available client apis. Each api has documentation and I am available to help if need be. The next step is to implement algolia in the front-end of your website. Algolia offers instantsearch which is a client library with pre-built components to help intergrate search or you could just call the algolia search api and render results the way you like. Documentation exists for both.

Let me know if this answers your questions. If you would like to dig deeper on any of the things I mentioned let me know and we can setup time to do that.

Thanks,

Elias
