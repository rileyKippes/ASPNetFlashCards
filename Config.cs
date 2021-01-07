using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashCards
{
    public class Config
    {
        public bool ShowBanner { get; set; }//if false, won't show the banner
        public string Banner { get; set; }
        public int BannerTime { get; set; } //Time Banner will be displayed, in milliseconds

        public override string ToString()
        {
            
            return "\n\n{\n showBanner:" + ShowBanner + 
                "\n banner:" + Banner + 
                "\n BannerTime:" + BannerTime +
                "\n}\n";
        }
    }
}
