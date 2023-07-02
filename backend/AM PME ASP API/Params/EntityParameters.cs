using System;
namespace AM_PME_ASP_API.Params
{
	public class EntityParameters
	{
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string Search { get; set; }

        public string OrderBy { get; set; }

        public bool Descending { get; set; } = false;
    }
}

