This element has a fixed position at the top of the screen which you can see here. Also, it behaves very differently on mobile.

```jsx
import { CMS_LINKS } from './SampleContent';
//<UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS} estimateExperiment={true}/>

// <UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS}/>
// <UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS} hideSearchIcon={true}/>
// <UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS} hideAccountIcon={true}/>
// <UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS} hideAccountIcon={true} hideSearchIcon={true}/>
<UniversalNavbarExpanded logoHref={'/#/Components/UniversalNavbarExpanded'} links={CMS_LINKS} hideAccountIcon={true} hideSearchIcon={true} showSecondaryCta={true}/>
```
