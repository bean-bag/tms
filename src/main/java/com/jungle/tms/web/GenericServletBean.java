package com.jungle.tms.web;

import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.GenericServlet;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeansException;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceEditor;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.ServletContextResourceLoader;
import org.springframework.web.util.NestedServletException;

public abstract class GenericServletBean extends GenericServlet
    implements Servlet, BeanNameAware, InitializingBean, DisposableBean
{
    private static class ServletConfigPropertyValues extends MutablePropertyValues
    {

        private static final long serialVersionUID = 0x9a7b2dc10abd2157L;

        public ServletConfigPropertyValues(ServletConfig config, Set<String> requiredProperties)
            throws ServletException
        {
            Set<String> missingProps = requiredProperties == null || requiredProperties.isEmpty() ? null : ((Set<String>) (new HashSet<String>(requiredProperties)));
            for(Enumeration<?> en = config.getInitParameterNames(); en.hasMoreElements();)
            {
                String property = (String)en.nextElement();
                Object value = config.getInitParameter(property);
                addPropertyValue(new PropertyValue(property, value));
                if(missingProps != null)
                    missingProps.remove(property);
            }

            if(missingProps != null && missingProps.size() > 0)
                throw new ServletException((new StringBuilder("Initialization from ServletConfig for Servlet '")).append(config.getServletName()).append("' failed; the following required properties were missing: ").append(StringUtils.collectionToDelimitedString(missingProps, ", ")).toString());
            else
                return;
        }
    }


    public GenericServletBean()
    {
    }

    public final void setBeanName(String beanName)
    {
        this.beanName = beanName;
    }

    public String getBeanName()
    {
        return beanName;
    }

    public void afterPropertiesSet()
        throws ServletException
    {
        initServletBean();
    }

    protected final void addRequiredProperty(String property)
    {
        requiredProperties.add(property);
    }

    public final void init(ServletConfig ServletConfig)
        throws ServletException
    {
        Assert.notNull(ServletConfig, "ServletConfig must not be null");
        if(logger.isDebugEnabled())
            logger.debug((new StringBuilder("Initializing Servlet '")).append(ServletConfig.getServletName()).append("'").toString());
        this.ServletConfig = ServletConfig;
        try
        {
            org.springframework.beans.PropertyValues pvs = new ServletConfigPropertyValues(ServletConfig, requiredProperties);
            BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
            org.springframework.core.io.ResourceLoader resourceLoader = new ServletContextResourceLoader(ServletConfig.getServletContext());
            bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader));
            initBeanWrapper(bw);
            bw.setPropertyValues(pvs, true);
        }
        catch(BeansException ex)
        {
            String msg = (new StringBuilder("Failed to set bean properties on Servlet '")).append(ServletConfig.getServletName()).append("': ").append(ex.getMessage()).toString();
            logger.error(msg, ex);
            throw new NestedServletException(msg, ex);
        }
        initServletBean();
        if(logger.isDebugEnabled())
            logger.debug((new StringBuilder("Servlet '")).append(ServletConfig.getServletName()).append("' configured successfully").toString());
    }

    protected void initBeanWrapper(BeanWrapper beanwrapper)
        throws BeansException
    {
    }

    protected void initServletBean()
        throws ServletException
    {
    }

    public void destroy()
    {
    }

    private static final long serialVersionUID = 0x735d3900b6a5f0L;
    protected final Log logger = LogFactory.getLog(getClass());
    private final Set<String> requiredProperties = new HashSet<String>();
    private String beanName;
    protected ServletConfig ServletConfig;
}