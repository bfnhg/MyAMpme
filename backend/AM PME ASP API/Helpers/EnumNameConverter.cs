using System;
using System.ComponentModel;
using System.Globalization;
using System.Reflection;

namespace AM_PME_ASP_API.Helpers
{
    public class EnumNameConverter : EnumConverter
    {
        public EnumNameConverter(Type type) : base(type) { }

        public override bool CanConvertFrom(ITypeDescriptorContext context, Type sourceType)
        {
            return sourceType == typeof(string);
        }

        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            if (value is string)
            {
                string stringValue = ((string)value).Trim();

                if (Enum.IsDefined(base.EnumType, stringValue))
                {
                    return Enum.Parse(base.EnumType, stringValue, true);
                }
            }

            return base.ConvertFrom(context, culture, value);
        }

        public override object ConvertTo(ITypeDescriptorContext context, CultureInfo culture, object value, Type destinationType)
        {
            if (destinationType == typeof(string))
            {
                FieldInfo field = value.GetType().GetField(value.ToString());

                if (field != null)
                {
                    DescriptionAttribute[] attributes = (DescriptionAttribute[])field.GetCustomAttributes(typeof(DescriptionAttribute), false);

                    if (attributes.Length > 0)
                    {
                        return attributes[0].Description;
                    }
                    else
                    {
                        return value.ToString();
                    }
                }
            }

            return base.ConvertTo(context, culture, value, destinationType);
        }
    }
}

