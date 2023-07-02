using System;
namespace AM_PME_ASP_API.Helpers
{
	public class DuplicateDataException : Exception
    {
        public DuplicateDataException(string message) : base(message)
        {

        }
    }
}

